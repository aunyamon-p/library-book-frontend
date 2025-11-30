import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, ArrowLeftRight, AlertCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const stats = [
  { name: "Total Books", value: "1,234", icon: BookOpen, change: "+12.5%" },
  { name: "Total Members", value: "456", icon: Users, change: "+8.2%" },
  { name: "Borrowed Books", value: "89", icon: ArrowLeftRight, change: "-3.1%" },
  { name: "Overdue", value: "12", icon: AlertCircle, change: "+2.4%" },
];

const chartData = [
  { month: "Jan", borrowed: 45, returned: 42 },
  { month: "Feb", borrowed: 52, returned: 48 },
  { month: "Mar", borrowed: 48, returned: 51 },
  { month: "Apr", borrowed: 61, returned: 55 },
  { month: "May", borrowed: 55, returned: 58 },
  { month: "Jun", borrowed: 67, returned: 62 },
];

const recentBorrows = [
  { id: "BRW001", member: "John Doe", book: "The Great Gatsby", date: "2024-01-15", status: "Borrowed" },
  { id: "BRW002", member: "Jane Smith", book: "1984", date: "2024-01-14", status: "Borrowed" },
  { id: "BRW003", member: "Mike Johnson", book: "To Kill a Mockingbird", date: "2024-01-14", status: "Returned" },
  { id: "BRW004", member: "Sarah Williams", book: "Pride and Prejudice", date: "2024-01-13", status: "Borrowed" },
  { id: "BRW005", member: "David Brown", book: "The Catcher in the Rye", date: "2024-01-13", status: "Overdue" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name} className="shadow-custom">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>{" "}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="shadow-custom">
        <CardHeader>
          <CardTitle>Borrow & Return Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }} 
              />
              <Bar dataKey="borrowed" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returned" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="shadow-custom">
        <CardHeader>
          <CardTitle>Recent Borrow Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">ID</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Member</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Book</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Date</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBorrows.map((record) => (
                  <tr key={record.id} className="border-b border-border last:border-0">
                    <td className="py-3 text-sm text-foreground">{record.id}</td>
                    <td className="py-3 text-sm text-foreground">{record.member}</td>
                    <td className="py-3 text-sm text-foreground">{record.book}</td>
                    <td className="py-3 text-sm text-muted-foreground">{record.date}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          record.status === "Borrowed"
                            ? "bg-accent text-accent-foreground"
                            : record.status === "Returned"
                            ? "bg-secondary text-secondary-foreground"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
