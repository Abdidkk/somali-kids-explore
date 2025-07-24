import SystemTestPanel from '@/components/SystemTestPanel';

export default function SystemTestPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">System Test Dashboard</h1>
          <p className="text-muted-foreground">
            Test all major system components and verify functionality
          </p>
        </div>
        <SystemTestPanel />
      </div>
    </div>
  );
}