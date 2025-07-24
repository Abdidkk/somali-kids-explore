import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useChildProfiles } from '@/hooks/useChildProfiles';
import { useLearningModules } from '@/hooks/useLearningModules';
import { useParentDashboard } from '@/hooks/useParentDashboard';
import { useAuth } from '@/hooks/useAuth';
import { useSubscription } from '@/hooks/useSubscription';

export default function SystemTestPanel() {
  const { user } = useAuth();
  const { subscribed, subscriptionTier, loading: subLoading } = useSubscription();
  const { childProfiles, loading: childLoading, addChildProfile, refreshChildProfiles } = useChildProfiles();
  const { loading: moduleLoading, startModule, completeLesson, getChildProgress, getChildBadges } = useLearningModules();
  const { loading: dashLoading, getFamilyOverview, getChildAnalytics } = useParentDashboard();
  
  const [testResults, setTestResults] = useState<string[]>([]);
  const [activeTest, setActiveTest] = useState<string | null>(null);

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`]);
  };

  const testChildProfile = async () => {
    setActiveTest('child-profile');
    try {
      addResult('🧪 Testing child profile creation...');
      const newChild = await addChildProfile('Test Barn', 8, 'blue', 'begynder', ['matematik', 'læsning']);
      addResult(`✅ Child profile created: ${newChild.name} (ID: ${newChild.id})`);
      
      await refreshChildProfiles();
      addResult(`✅ Child profiles refreshed. Total: ${childProfiles.length}`);
    } catch (error) {
      addResult(`❌ Child profile test failed: ${error}`);
    }
    setActiveTest(null);
  };

  const testLearningModule = async () => {
    if (childProfiles.length === 0) {
      addResult('❌ No child profiles found. Create one first.');
      return;
    }
    
    setActiveTest('learning-module');
    try {
      const childId = childProfiles[0].id;
      addResult('🧪 Testing learning module...');
      
      const moduleResult = await startModule(childId, 'matematik-basis', 10);
      addResult(`✅ Module started: ${JSON.stringify(moduleResult)}`);
      
      const lessonResult = await completeLesson(childId, 'matematik-basis', 'lesson-1');
      addResult(`✅ Lesson completed: ${JSON.stringify(lessonResult)}`);
      
      const progress = await getChildProgress(childId);
      addResult(`✅ Progress retrieved: ${progress.progress.length} entries`);
      
      const badges = await getChildBadges(childId);
      addResult(`✅ Badges retrieved: ${badges.badges.length} badges`);
    } catch (error) {
      addResult(`❌ Learning module test failed: ${error}`);
    }
    setActiveTest(null);
  };

  const testParentDashboard = async () => {
    setActiveTest('parent-dashboard');
    try {
      addResult('🧪 Testing parent dashboard...');
      
      const familyData = await getFamilyOverview();
      addResult(`✅ Family overview: ${familyData.familyTotals.totalChildren} children, ${familyData.familyTotals.totalCompletedModules} completed modules`);
      
      if (childProfiles.length > 0) {
        const childAnalytics = await getChildAnalytics(childProfiles[0].id);
        addResult(`✅ Child analytics: ${childAnalytics.totalLearningTime}min total learning, ${childAnalytics.badgesEarned} badges`);
      }
    } catch (error) {
      addResult(`❌ Parent dashboard test failed: ${error}`);
    }
    setActiveTest(null);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  if (!user) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>System Test Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please log in to test the system functionality.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>System Status Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Badge variant={user ? "default" : "destructive"}>
              Auth: {user ? "✅" : "❌"}
            </Badge>
          </div>
          <div className="text-center">
            <Badge variant={!subLoading ? "default" : "secondary"}>
              Subscription: {subLoading ? "Loading..." : subscribed ? `✅ ${subscriptionTier}` : "❌ None"}
            </Badge>
          </div>
          <div className="text-center">
            <Badge variant={!childLoading ? "default" : "secondary"}>
              Children: {childLoading ? "Loading..." : `${childProfiles.length} profiles`}
            </Badge>
          </div>
          <div className="text-center">
            <Badge variant="outline">
              User: {user.email}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Child Profiles Test</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testChildProfile} 
              disabled={activeTest === 'child-profile' || childLoading}
              className="w-full"
            >
              {activeTest === 'child-profile' ? 'Testing...' : 'Test Child Profile CRUD'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Current profiles: {childProfiles.length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Learning Modules Test</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testLearningModule} 
              disabled={activeTest === 'learning-module' || moduleLoading || childProfiles.length === 0}
              className="w-full"
            >
              {activeTest === 'learning-module' ? 'Testing...' : 'Test Learning System'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Requires at least 1 child profile
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Parent Dashboard Test</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={testParentDashboard} 
              disabled={activeTest === 'parent-dashboard' || dashLoading}
              className="w-full"
            >
              {activeTest === 'parent-dashboard' ? 'Testing...' : 'Test Dashboard API'}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              Tests family overview & analytics
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Test Results</CardTitle>
          <Button variant="outline" size="sm" onClick={clearResults}>
            Clear Results
          </Button>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-muted-foreground text-sm">Run tests to see results here...</p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}