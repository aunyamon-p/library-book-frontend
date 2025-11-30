import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const mockReturned = [
  {
    return_id: 1,
    user_name: "Jane Smith",
    book_name: "1984",
    borrow_date: "2024-01-08",
    return_date: "2024-01-22",
    fine: 0,
    status: "On Time",
    processed_by: "admin01",
  },
  {
    return_id: 2,
    user_name: "David Brown",
    book_name: "Pride and Prejudice",
    borrow_date: "2023-12-15",
    return_date: "2024-01-10",
    fine: 15,
    status: "Late",
    processed_by: "admin01",
  },
];

export default function Returned() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Returned Books</h1>
        <p className="text-sm text-muted-foreground">View completed book returns and fines</p>
      </div>

      <Card className="shadow-custom">
        <CardHeader>
          <CardTitle>Return History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Return ID</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Member</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Book</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Borrow Date</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Return Date</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Fine ($)</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Processed By</th>
                </tr>
              </thead>
              <tbody>
                {mockReturned.map((record) => (
                  <tr key={record.return_id} className="border-b border-border last:border-0">
                    <td className="py-3 text-sm text-foreground">RET{String(record.return_id).padStart(3, "0")}</td>
                    <td className="py-3 text-sm font-medium text-foreground">{record.user_name}</td>
                    <td className="py-3 text-sm text-foreground">{record.book_name}</td>
                    <td className="py-3 text-sm text-muted-foreground">{record.borrow_date}</td>
                    <td className="py-3 text-sm text-muted-foreground">{record.return_date}</td>
                    <td className="py-3 text-sm text-foreground">${record.fine.toFixed(2)}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          record.status === "On Time"
                            ? "bg-accent text-accent-foreground"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {record.status}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{record.processed_by}</td>
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
