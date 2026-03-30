import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, User, Mail, Clock, Inbox } from "lucide-react";
import { format } from "date-fns";
import type { ContactMessage } from "@/types/dashboard";

interface ContactMessagesTableProps {
  messages: ContactMessage[];
  isLoading?: boolean;
}

const ContactMessagesTable = ({ messages, isLoading }: ContactMessagesTableProps) => {
  const sortedMessages = [...messages].sort(
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
            <MessageSquare className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Contact Messages</CardTitle>
            <CardDescription>
              Inbox of contact form submissions ({messages.length} total)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : sortedMessages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Inbox className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
            <p className="text-muted-foreground">
              Contact messages will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedMessages.map((message) => (
              <Card key={message._id} className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-3">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{message.name}</h4>
                          <a
                            href={`mailto:${message.email}`}
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            <Mail className="h-3 w-3" />
                            {message.email}
                          </a>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-normal flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDate(message.createdAt)}
                      </Badge>
                    </div>

                    {/* Message Content */}
                    <div className="pl-13">
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {message.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ContactMessagesTable;
