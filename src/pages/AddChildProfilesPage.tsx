import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Baby, Plus, ArrowRight, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useChildren } from "@/hooks/useChildren";
import { useSubscription } from "@/hooks/useSubscription";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const avatarColors = [
  { name: "Purple", value: "purple", class: "bg-purple-500" },
  { name: "Blue", value: "blue", class: "bg-blue-500" },
  { name: "Green", value: "green", class: "bg-green-500" },
  { name: "Pink", value: "pink", class: "bg-pink-500" },
  { name: "Orange", value: "orange", class: "bg-orange-500" },
  { name: "Red", value: "red", class: "bg-red-500" },
];

interface ChildForm {
  name: string;
  age: string;
  favoriteColor: string;
}

export default function AddChildProfilesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, refreshUserState } = useAuth();
  const { children, addChild, loading: childrenLoading } = useChildren();
  const { billingInterval } = useSubscription();
  const [forms, setForms] = useState<ChildForm[]>([
    { name: "", age: "", favoriteColor: "purple" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [maxChildrenPaid, setMaxChildrenPaid] = useState<number | null>(null);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [isPollingPlan, setIsPollingPlan] = useState(false);

  // Calculate allowed children: 1 base child + extra paid slots
  const allowedChildren = maxChildrenPaid;

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  // Handle payment success from URL parameter with polling for num_kids update
  useEffect(() => {
    const paymentStatus = searchParams.get('payment');
    if (paymentStatus === 'success') {
      setShowPaymentSuccess(true);
      toast.success('Betaling gennemført! Opdaterer din plan...');
      
      // Start polling for num_kids update from webhook
      const startPolling = async () => {
        if (!user?.email) return;
        
        setIsPollingPlan(true);
        const startTime = Date.now();
        const maxPollTime = 45000; // 45 seconds max
        const pollInterval = 2000; // 2 seconds between polls
        
        const originalNumKids = maxChildrenPaid;
        
        const poll = async (): Promise<void> => {
          try {
            const { data, error } = await supabase
              .from('subscribers')
              .select('num_kids')
              .or(`user_id.eq.${user.id},email.eq.${user.email}`)
              .maybeSingle();
            
            if (data && data.num_kids !== null && data.num_kids > (originalNumKids || 0)) {
              // Success! num_kids has increased
              setMaxChildrenPaid(data.num_kids);
              setIsPollingPlan(false);
              toast.success(`Din plan er opdateret! Du kan nu oprette op til ${1 + data.num_kids} børneprofiler.`);
              return;
            }
            
            // Continue polling if we haven't exceeded max time
            if (Date.now() - startTime < maxPollTime) {
              setTimeout(() => poll(), pollInterval);
            } else {
              // Timeout - webhook might have failed
              setIsPollingPlan(false);
              toast.error('Din plan opdateres i baggrunden. Prøv at opdatere siden om et øjeblik.', {
                duration: 6000,
                action: {
                  label: 'Opdater side',
                  onClick: () => window.location.reload()
                }
              });
            }
          } catch (error) {
            console.error('Polling error:', error);
            setIsPollingPlan(false);
          }
        };
        
        // Start first poll
        await poll();
      };
      
      startPolling();
      
      // Remove payment parameter from URL
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('payment');
      navigate({ search: newParams.toString() }, { replace: true });
    } else if (paymentStatus === 'cancelled') {
      toast.error('Betaling blev annulleret');
      
      // Remove payment parameter from URL
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('payment');
      navigate({ search: newParams.toString() }, { replace: true });
    }
  }, [searchParams, navigate, user, maxChildrenPaid]);

  // Hent det betalte antal børn fra databasen - robust fetch med auto-healing
  useEffect(() => {
    const fetchMaxChildren = async () => {
      if (!user?.email) return;
      
      try {
        console.log('[AddChildProfilesPage] Fetching num_kids for user:', user.id, user.email);
        
        // Strategi 1: Hent via user_id
        const { data: byUser, error: e1 } = await supabase
          .from('subscribers')
          .select('id, user_id, email, num_kids')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (byUser) {
          console.log('[AddChildProfilesPage] ✅ Found by user_id:', byUser);
          setMaxChildrenPaid(byUser.num_kids ?? 0);
          return;
        }
        
        // Strategi 2: Hvis ikke fundet via user_id, prøv via email (fallback)
        console.log('[AddChildProfilesPage] Not found by user_id, trying email...');
        const { data: byEmail, error: e2 } = await supabase
          .from('subscribers')
          .select('id, user_id, email, num_kids')
          .eq('email', user.email)
          .maybeSingle();
        
        if (byEmail) {
          console.log('[AddChildProfilesPage] ✅ Found by email:', byEmail);
          
          // Auto-healing: Hvis vi fandt via email men user_id er forkert, opdater den
          if (byEmail.user_id !== user.id) {
            console.log('[AddChildProfilesPage] 🔧 Auto-healing: Updating user_id from', byEmail.user_id, 'to', user.id);
            const { error: updateError } = await supabase
              .from('subscribers')
              .update({ user_id: user.id, updated_at: new Date().toISOString() })
              .eq('id', byEmail.id);
            
            if (updateError) {
              console.error('[AddChildProfilesPage] Failed to update user_id:', updateError);
            } else {
              console.log('[AddChildProfilesPage] ✅ user_id updated successfully');
            }
          }
          
          setMaxChildrenPaid(byEmail.num_kids ?? 0);
          return;
        }
        
        // Ingen subscriber row fundet - sæt til 0
        console.log('[AddChildProfilesPage] No subscriber found - setting maxChildrenPaid to 0');
        setMaxChildrenPaid(0);
        
      } catch (error) {
        console.error('[AddChildProfilesPage] Error fetching num_kids:', error);
        setMaxChildrenPaid(0);
      }
    };
    
    fetchMaxChildren();
  }, [user, children]);


  const addForm = () => {
    // Tjek om vi har nået grænsen for betalte børneprofiler
    if (allowedChildren !== null && (children.length + forms.length) >= allowedChildren) {
      const message = allowedChildren === 1 
        ? "Du skal købe en plan for at oprette børneprofiler. Basic planen (45 kr/måned) inkluderer 1 barn."
        : `Du har nået grænsen på ${allowedChildren} børneprofiler. Opgradér dit abonnement for at tilføje flere børn.`;
      
      toast.error(message, {
        action: {
          label: allowedChildren === 1 ? "Køb plan" : "Opgradér",
          onClick: () => navigate('/choose-plan')
        }
      });
      return;
    }
    
    setForms([...forms, { name: "", age: "", favoriteColor: "purple" }]);
  };

  const removeForm = (index: number) => {
    if (forms.length > 1) {
      setForms(forms.filter((_, i) => i !== index));
    }
  };

  const updateForm = (index: number, field: keyof ChildForm, value: string) => {
    const updatedForms = [...forms];
    updatedForms[index][field] = value;
    setForms(updatedForms);
  };

  const handleSubmit = async () => {
    // Validate forms
    const validForms = forms.filter(form => form.name.trim() && form.age.trim());
    
    if (validForms.length === 0) {
      toast.error("Tilføj mindst ét barn med navn og alder");
      return;
    }

    // Tjek om vi overskride grænsen for betalte børneprofiler
    if (allowedChildren !== null && (children.length + validForms.length) > allowedChildren) {
      const message = allowedChildren === 1
        ? "Du skal købe en plan for at oprette børneprofiler. Basic planen (45 kr/måned) inkluderer 1 barn."
        : `Du kan ikke tilføje ${validForms.length} børn. Du har nået grænsen på ${allowedChildren} børneprofiler.`;
      
      toast.error(message, {
        action: {
          label: allowedChildren === 1 ? "Køb plan" : "Opgradér plan",
          onClick: () => navigate('/choose-plan')
        }
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Add all children
      for (const form of validForms) {
        await addChild(
          form.name.trim(),
          parseInt(form.age),
          form.favoriteColor
        );
      }
      
      toast.success(`${validForms.length} barn${validForms.length > 1 ? '' : ''} tilføjet!`);
      
      // Refresh user state first, then navigate to dashboard
      await refreshUserState();
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Error adding children:', error);
      toast.error("Der opstod en fejl ved tilføjelse af børneprofiler");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddChildPayment = async () => {
    if (!user) return;
    
    setIsPaymentLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('add-child-payment', {
        body: { billingInterval: billingInterval || 'month' },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) {
        console.error('Payment error:', error);
        toast.error('Der opstod en fejl ved oprettelse af betalingslink');
        return;
      }

      if (data?.url) {
        // Åbn Stripe Checkout i nyt faneblad
        window.open(data.url, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Der opstod en fejl ved oprettelse af betalingslink');
    } finally {
      setIsPaymentLoading(false);
    }
  };

  // Show minimal loading for initial data fetch only
  if (childrenLoading && maxChildrenPaid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Indlæser...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Baby className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Tilføj dit barns profil
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Opret personlige profiler for dine børn så de kan lære på deres eget niveau
          </p>
          {isPollingPlan && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700 flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600"></div>
              <span>Opdaterer din plan...</span>
            </div>
          )}
          {!isPollingPlan && allowedChildren !== null && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
              {allowedChildren === 1 ? (
                <span>Du skal købe en plan for at oprette børneprofiler. <strong>Basic planen (45 kr/måned) inkluderer 1 barn.</strong></span>
              ) : (
                <span>Du kan oprette op til <strong>{allowedChildren}</strong> børneprofiler. Du har allerede oprettet <strong>{children.length}</strong>.</span>
              )}
            </div>
          )}

        </div>

        <div className="bg-card rounded-xl shadow-lg p-6 border">
          <div className="space-y-6">
            {forms.map((form, index) => (
              <div key={index} className="border border-border rounded-lg p-4 bg-background/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Barn {index + 1}
                  </h3>
                  {forms.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeForm(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      Fjern
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Navn *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => updateForm(index, 'name', e.target.value)}
                      placeholder="Barnets navn"
                      className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Alder *
                    </label>
                    <input
                      type="number"
                      value={form.age}
                      onChange={(e) => updateForm(index, 'age', e.target.value)}
                      placeholder="Alder"
                      min="3"
                      max="12"
                      className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-primary bg-background"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Vælg yndlingsfarve
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {avatarColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => updateForm(index, 'favoriteColor', color.value)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          form.favoriteColor === color.value
                            ? 'border-foreground scale-110'
                            : 'border-border hover:border-muted-foreground'
                        } ${color.class}`}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addForm}
              disabled={isPollingPlan || (allowedChildren !== null && (children.length + forms.length) >= allowedChildren)}
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tilføj endnu et barn
            </Button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {allowedChildren === 1 ? (
              <Button
                variant="outline"
                onClick={() => navigate('/choose-plan')}
                className="flex-1"
                disabled={isPollingPlan}
              >
                Køb Basic plan
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleAddChildPayment}
                disabled={isPaymentLoading || isPollingPlan}
                className="flex-1"
              >
                {isPaymentLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
                    Indlæser...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Tilføj 1 barn ({billingInterval === 'year' ? '135 kr/år' : '15 kr/måned'})
                  </div>
                )}
              </Button>
            )}
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || isPollingPlan}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground" />
                  Gemmer...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Gem profiler
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}