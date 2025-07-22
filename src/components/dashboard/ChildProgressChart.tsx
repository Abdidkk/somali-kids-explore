
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";

interface ChildProgressChartProps {
  children: Array<{
    name: string;
    totalPoints: number;
    activitiesCompleted: number;
    categoryProgress: Record<string, number>;
  }>;
}

export default function ChildProgressChart({ children }: ChildProgressChartProps) {
  // Prepare data for bar chart
  const chartData = children.map(child => ({
    name: child.name === 'default' ? 'Standard' : child.name,
    points: child.totalPoints,
    activities: child.activitiesCompleted
  }));

  // Get top 5 categories across all children
  const allCategories = new Set<string>();
  children.forEach(child => {
    Object.keys(child.categoryProgress).forEach(cat => allCategories.add(cat));
  });

  const categoryData = Array.from(allCategories).slice(0, 5).map(category => {
    const dataPoint: any = { category };
    children.forEach(child => {
      const childName = child.name === 'default' ? 'Standard' : child.name;
      dataPoint[childName] = child.categoryProgress[category] || 0;
    });
    return dataPoint;
  });

  const chartConfig = {
    points: {
      label: "Point",
      color: "hsl(var(--chart-1))",
    },
    activities: {
      label: "Aktiviteter",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Points and Activities Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Sammenligning af Fremgang</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="points" fill="var(--color-points)" />
              <Bar dataKey="activities" fill="var(--color-activities)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Category Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Kategori Præstation</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart data={categoryData}>
              <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              {children.map((child, index) => (
                <Line 
                  key={child.name}
                  type="monotone" 
                  dataKey={child.name === 'default' ? 'Standard' : child.name} 
                  stroke={`hsl(${120 + (index * 60)}, 70%, 50%)`}
                  strokeWidth={2}
                />
              ))}
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
