import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Mail, FileText, Inbox } from "lucide-react";
import { format } from "date-fns";
import type { ProjectSlotRequest } from "@/types/dashboard";

interface SlotRequestsTableProps {
  requests: ProjectSlotRequest[];
  isLoading?: boolean;
}

const SlotRequestsTable = ({ requests, isLoading }: SlotRequestsTableProps) => {
  const sortedRequests = [...requests].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM dd, yyyy 'at' hh:mm a");
    } catch {
      return dateString;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10">
            <CalendarClock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Project Slot Requests</CardTitle>
            <CardDescription>
              Incoming requests for project slots ({requests.length} total)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : sortedRequests.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No requests yet</h3>
            <p className="text-muted-foreground">
              Project slot requests will appear here.
            </p>
          </div>
        ) : (
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email
                    </div>
                  </TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Project Details
                    </div>
                  </TableHead>
                  <TableHead className="w-[180px]">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4" />
                      Submitted
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRequests.map((request) => (
                  <TableRow key={request._id}>
                    <TableCell className="font-medium">
                      <a
                        href={`mailto:${request.email}`}
                        className="text-primary hover:underline"
                      >
                        {request.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {request.projectDetails}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {formatDate(request.createdAt)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SlotRequestsTable;
