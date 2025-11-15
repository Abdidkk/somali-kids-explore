import { useAuth } from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { useChildProfiles } from "@/hooks/useChildProfiles";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SubscriptionStatus from "@/components/SubscriptionStatus";
import FamilyProgressOverview from "@/components/dashboard/FamilyProgressOverview";
import ChildProgressChart from "@/components/dashboard/ChildProgressChart";
import ChildSelector from "@/components/dashboard/ChildSelector";
import { useMultiChildProgress } from "@/hooks/useMultiChildProgress";
import { ChildrenDisplay } from "@/components/kids/ChildrenDisplay";
import { BookOpen, Users, Settings, Activity, Award, Clock, AlertCircle, Lock } from "lucide-react";
import { PointsManager } from "@/utils/pointsManager";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { learningCategories } from "@/data/learningCategories";
import { resolveChildProfileIdByName } from "@/utils/childProfile";

const DashboardPage = () => {
  const { user, loading: authLoading } = useAuth();
  const { subscribed, inTrial, subscriptionTier } = useSubscription();
  const { childProfiles, loading: childProfilesLoading } = useChildProfiles();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { childrenData, loading: childrenLoading, refreshData } = useMultiChildProgress();

  const [progressData, setProgressData] = useState<any>(null);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>("");
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  // Get selected child data including is_active status
  const selectedChildData = childProfiles.find(c => c.name === selectedChild);
  const isChildActive = selectedChildData?.is_active ?? true;

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Set selected child to first child when profiles are loaded
  useEffect(() => {
    if (!childProfilesLoading && childProfiles.length > 0 && !selectedChild) {
      const firstChild = childProfiles[0].name;
      // Validate child name before setting
      if (firstChild && firstChild.trim() !== '' && firstChild !== 'default') {
        setSelectedChild(firstChild);
      }
    }
  }, [childProfiles, childProfilesLoading, selectedChild]);

  // Load progress data for selected child
  useEffect(() => {
    const loadSelectedChildData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);

        // Resolve child id for selected name (latest created), store for reuse
        const childId = await resolveChildProfileIdByName(user.id, selectedChild);
        setSelectedChildId(childId);

        // Set current child in PointsManager (with id if available)
        if (childId) {
          PointsManager.setCurrentChildWithId(selectedChild, childId);
        } else {
          PointsManager.setCurrentChild(selectedChild);
        }
        console.log('Dashboard: Set current child to', selectedChild, 'id:', childId);
        
        // Get progress data
        const progress = await PointsManager.getProgress();
        setProgressData(progress);

        // Get recent quiz results (prefer id)
        let quizQuery = supabase
          .from('quiz_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);

        if (childId) {
          quizQuery = quizQuery.eq('child_profile_id', childId);
        } else {
          quizQuery = quizQuery.eq('child_name', selectedChild);
        }

        const { data: quizResults } = await quizQuery;
        setRecentActivity(quizResults || []);

        // Get categories with their enabled status (prefer id)
        let progressRowsQuery = supabase
          .from('progress')
          .select('*')
          .eq('user_id', user.id);

        if (childId) {
          progressRowsQuery = progressRowsQuery.eq('child_profile_id', childId);
        } else {
          progressRowsQuery = progressRowsQuery.eq('child_name', selectedChild);
        }

        const { data: progressRows } = await progressRowsQuery;

        const categoryMap = new Map();
        progressRows?.forEach((row: any) => {
          categoryMap.set(row.category, {
            ...row,
            enabled: row.category_enabled
          });
        });

        const allCategories = learningCategories.map(cat => cat.name);
        const categoryList = allCategories.map(cat => ({
          name: cat,
          enabled: categoryMap.get(cat)?.enabled ?? true,
          points: categoryMap.get(cat)?.total_points ?? 0,
          activities: categoryMap.get(cat)?.activities_completed ?? 0
        }));

        setCategories(categoryList);

      } catch (error) {
        console.error('Error loading selected child data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user && selectedChild) {
      loadSelectedChildData();
    }
  }, [user, selectedChild]);

  // Real-time listeners for progress updates
  useEffect(() => {
    if (!user) return;

    const progressChannel = supabase
      .channel('progress-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'progress',
          filter: `user_id=eq.${user.id}`
        },
        async (payload) => {
          console.log('Real-time progress update:', payload);
          refreshData(); // Refresh all children data
        
          // Genindlæs categories for valgt barn
          if (user && selectedChild) {
            const childId = selectedChildId ?? (await resolveChildProfileIdByName(user.id, selectedChild));
            let progressRowsQuery = supabase
              .from('progress')
              .select('*')
              .eq('user_id', user.id);
        
            if (childId) {
              progressRowsQuery = progressRowsQuery.eq('child_profile_id', childId);
            } else {
              progressRowsQuery = progressRowsQuery.eq('child_name', selectedChild);
            }
        
            const { data: progressRows } = await progressRowsQuery;
        
            const categoryMap = new Map();
            progressRows?.forEach((row: any) => {
              categoryMap.set(row.category, {
                ...row,
                enabled: row.category_enabled
              });
            });
        
            const allCategories = learningCategories.map(cat => cat.name);
            const categoryList = allCategories.map(cat => ({
              name: cat,
              enabled: categoryMap.get(cat)?.enabled ?? true,
              points: categoryMap.get(cat)?.total_points ?? 0,
              activities: categoryMap.get(cat)?.activities_completed ?? 0
            }));
        
            setCategories(categoryList);
          }
        }
      )        
      .subscribe();

    const quizResultsChannel = supabase
      .channel('quiz-results-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'quiz_results',
          filter: `user_id=eq.${user.id}`
        },
        async (payload) => {
          console.log('Real-time quiz result added:', payload);
          refreshData(); // Refresh all children data
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(progressChannel);
      supabase.removeChannel(quizResultsChannel);
    };
  }, [user, refreshData]);

  const handleCategoryToggle = async (categoryName: string, enabled: boolean) => {
    const prevCategories = categories; // Gem backup til rollback
    
    try {
      // Optimistisk UI opdatering
      setCategories(prev => 
        prev.map(cat => 
          cat.name === categoryName ? { ...cat, enabled } : cat
        )
      );
  
      await PointsManager.toggleCategory(categoryName, enabled);
  
      // Genindlæs fra DB for at være 100% sikker
      if (user) {
        const childId = selectedChildId ?? (await resolveChildProfileIdByName(user.id, selectedChild));
        let progressRowsQuery = supabase
          .from('progress')
          .select('*')
          .eq('user_id', user.id);
  
        if (childId) {
          progressRowsQuery = progressRowsQuery.eq('child_profile_id', childId);
        } else {
          progressRowsQuery = progressRowsQuery.eq('child_name', selectedChild);
        }
  
        const { data: progressRows } = await progressRowsQuery;
  
        const categoryMap = new Map();
        progressRows?.forEach((row: any) => {
          categoryMap.set(row.category, {
            ...row,
            enabled: row.category_enabled
          });
        });
  
        const allCategories = learningCategories.map(cat => cat.name);
        const categoryList = allCategories.map(cat => ({
          name: cat,
          enabled: categoryMap.get(cat)?.enabled ?? true,
          points: categoryMap.get(cat)?.total_points ?? 0,
          activities: categoryMap.get(cat)?.activities_completed ?? 0
        }));
  
        setCategories(categoryList);
      }
  
      toast({
        title: enabled ? "Kategori aktiveret" : "Kategori deaktiveret", 
        description: `${categoryName} er nu ${enabled ? 'tilgængelig' : 'skjult'} for ${selectedChild}`,
      });
    } catch (error) {
      console.error('Error toggling category:', error);
      // Rollback til tidligere state
      setCategories(prevCategories);
      toast({
        title: "Fejl",
        description: "Kunne ikke opdatere kategori-indstillinger",
        variant: "destructive"
      });
    }
  };
  

  const handleChildSelect = (childName: string) => {
    setSelectedChild(childName);
  };

  const handleReactivateChild = async () => {
    try {
      setIsPaymentLoading(true);
      
      // Call the existing add-child-payment edge function
      const { data: sessionData } = await supabase.auth.getSession();
      const { data, error } = await supabase.functions.invoke('add-child-payment', {
        body: { billingInterval: 'month' },
        headers: {
          Authorization: `Bearer ${sessionData.session?.access_token}`,
        },
      });

      if (error) throw error;

      // Redirect to Stripe checkout
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error reactivating child:', error);
      toast({
        title: "Fejl",
        description: "Der opstod en fejl ved aktivering af barnet. Prøv igen.",
        variant: "destructive"
      });
    } finally {
      setIsPaymentLoading(false);
    }
  };

  if (authLoading || loading || childrenLoading || childProfilesLoading || !selectedChild) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">
          {childProfilesLoading ? "Indlæser børneprofiler..." : 
           !selectedChild ? "Ingen børn fundet..." : 
           "Indlæser..."}
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const stats = [
    {
      title: "Samlede Point",
      value: progressData?.totalPoints?.toString() || "0",
      icon: Award,
      description: "Optjent i alt"
    },
    {
      title: "Afsluttede Aktiviteter",
      value: progressData?.activitiesCompleted?.toString() || "0",
      icon: Activity,
      description: "Gennemført"
    },
    {
      title: "Aktive Kategorier",
      value: categories.filter(c => c.enabled).length.toString(),
      icon: Users,
      description: "Tilgængelige"
    },
    {
      title: "Seneste Aktivitet",
      value: recentActivity.length > 0 ? "I dag" : "Ingen",
      icon: Clock,
      description: "Sidste aktivitet"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Velkommen tilbage, {user.user_metadata?.name || user.email?.split('@')[0] || 'Bruger'}!
          </h1>
          <p className="text-xl text-gray-600">
            Her er din personlige dashboard
          </p>
        </div>

        {/* Subscription Status */}
        <div className="mb-8">
          <SubscriptionStatus />
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overblik</TabsTrigger>
            <TabsTrigger value="family">Familie Fremgang</TabsTrigger>
            <TabsTrigger value="settings">Indstillinger</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Child Selection */}
            {childrenData.length > 1 && (
              <ChildSelector 
                children={childrenData}
                selectedChild={selectedChild}
                onChildSelect={handleChildSelect}
              />
            )}

            {/* Quick Stats for Selected Child */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Activity for Selected Child */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Seneste Aktivitet - {selectedChild}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{activity.activity_name}</p>
                          <p className="text-sm text-gray-600">{activity.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{activity.score}/{activity.max_score}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(activity.created_at).toLocaleDateString('da-DK')}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">Ingen aktivitet endnu</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="family" className="space-y-6">
            {/* Family Progress Overview */}
            <FamilyProgressOverview 
              children={childrenData}
              onChildSelect={handleChildSelect}
            />

            {/* Progress Charts */}
            {childrenData.length > 1 && (
              <ChildProgressChart children={childrenData} />
            )}
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Category Controls for Selected Child */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Kategori Kontrol - {selectedChild}
                </CardTitle>
                <CardDescription>
                  Aktivér eller deaktivér kategorier for dette barn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map(category => (
                    <div key={category.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">
                          {category.points} point • {category.activities} aktiviteter
                        </p>
                      </div>
                      <Switch
                        checked={category.enabled}
                        onCheckedChange={(enabled) => handleCategoryToggle(category.name, enabled)}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <ChildrenDisplay 
            onChildSelect={handleChildSelect}
            selectedChild={selectedChild}
          />

          <Card>
            <CardHeader>
              <CardTitle>Start læring</CardTitle>
              <CardDescription>
                Gå til læringsmodulet og start lektioner
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isChildActive && selectedChildData && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{selectedChildData.name} er inaktiv</AlertTitle>
                  <AlertDescription className="space-y-3">
                    <p>Dette barn er sat i bero, da der ikke længere betales for det ekstra abonnement.</p>
                    <Button 
                      onClick={handleReactivateChild}
                      disabled={isPaymentLoading}
                      variant="outline"
                      size="sm"
                    >
                      {isPaymentLoading ? "Behandler..." : `Aktiver ${selectedChildData.name} igen (15 kr/måned)`}
                    </Button>
                  </AlertDescription>
                </Alert>
              )}
              
              <Button 
                onClick={() => navigate('/learning')}
                variant="outline"
                className="w-full"
                disabled={(!subscribed && !inTrial) || !isChildActive}
              >
                {!isChildActive ? (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Barn inaktivt
                  </>
                ) : (!subscribed && !inTrial) ? (
                  <>
                    <Lock className="mr-2 h-4 w-4" />
                    Kræver abonnement
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Start læring
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
