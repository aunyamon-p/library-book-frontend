import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AdminModal } from "@/components/modals/AdminModal";
import { toast } from "sonner";

const mockAdmins = [
  {
    admin_id: 1,
    username: "admin01",
    password: "****",
    first_name: "John",
    last_name: "Admin",
    name: "John Admin",
    role: "Super Admin",
    created: "2023-01-01",
  },
  {
    admin_id: 2,
    username: "admin02",
    password: "****",
    first_name: "Sarah",
    last_name: "Manager",
    name: "Sarah Manager",
    role: "Manager",
    created: "2023-06-15",
  },
];

export default function Admin() {
  const [admins, setAdmins] = useState(mockAdmins);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<typeof mockAdmins[0] | null>(null);

  const handleAdd = () => {
    setSelectedAdmin(null);
    setIsModalOpen(true);
  };

  const handleEdit = (admin: typeof mockAdmins[0]) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleDelete = (adminId: number) => {
    setAdmins(admins.filter((a) => a.admin_id !== adminId));
    toast.success("Admin deleted successfully");
  };

  const handleSave = (adminData: any) => {
    if (selectedAdmin) {
      setAdmins(admins.map((a) => (a.admin_id === selectedAdmin.admin_id ? { ...adminData, admin_id: a.admin_id } : a)));
      toast.success("Admin updated successfully");
    } else {
      setAdmins([...admins, { ...adminData, admin_id: admins.length + 1 }]);
      toast.success("Admin added successfully");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Management</h1>
          <p className="text-sm text-muted-foreground">Manage system administrators</p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Admin
        </Button>
      </div>

      <Card className="shadow-custom">
        <CardHeader>
          <CardTitle>Admin List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">ID</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Username</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Name</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Role</th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">Created</th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr key={admin.admin_id} className="border-b border-border last:border-0">
                    <td className="py-3 text-sm text-foreground">{admin.admin_id}</td>
                    <td className="py-3 text-sm font-medium text-foreground">{admin.username}</td>
                    <td className="py-3 text-sm text-foreground">{admin.name}</td>
                    <td className="py-3">
                      <span className="inline-flex rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground">
                        {admin.role}
                      </span>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{admin.created}</td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(admin)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(admin.admin_id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        admin={selectedAdmin}
      />
    </div>
  );
}
