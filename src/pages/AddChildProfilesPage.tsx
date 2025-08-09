import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Baby, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useChildren } from "@/hooks/useChildren";
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
  const { user, refreshUserState } = useAuth();
  const { children, addChild, loading: childrenLoading } = useChildren();
  const [forms, setForms] = useState<ChildForm[]>([
    { name: "", age: "", favoriteColor: "purple" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
  }, [user, navigate]);

  const addForm = () => {
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
      
      // Navigér først for at undgå guard-race; opdater brugerstatus bagefter
      navigate('/congratulations', { replace: true });
      setTimeout(() => {
        refreshUserState().catch(() => {});
      }, 0);
    } catch (error) {
      console.error('Error adding children:', error);
      toast.error("Der opstod en fejl ved tilføjelse af børneprofiler");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (childrenLoading) {
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
              className="w-full flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Tilføj endnu et barn
            </Button>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              onClick={() => navigate('/choose-plan')}
              className="flex-1"
            >
              Tilbage til planer
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
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