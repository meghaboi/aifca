export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  format: "number" | "currency";
  trend: number;
  tone?: "default" | "urgent";
}

export interface ComplianceTask {
  id: string;
  clientName: string;
  taskType: string;
  dueDate: string;
  assignee: string;
  status: "pending" | "in_progress" | "done" | "late";
  done: boolean;
}

export interface FilingChartDatum {
  module: "GST" | "ITR" | "TDS" | "ROC";
  filings: number;
}

export interface CompletionChartDatum {
  name: string;
  value: number;
  color: string;
}

export interface ClientHealth {
  id: string;
  clientName: string;
  score: number;
  status: "healthy" | "warning" | "critical";
}

export interface ActivityItem {
  id: string;
  type: "filing" | "document" | "notice";
  description: string;
  clientName: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  type: "filing_confirmation" | "deadline" | "whatsapp_document" | "regulatory_alert";
  title: string;
  message: string;
  unread: boolean;
}

export interface CommandItem {
  id: string;
  type: "client" | "task" | "deadline" | "settings";
  name: string;
  context: string;
  href: string;
}

export interface DashboardPayload {
  stats: DashboardStat[];
  tasks: ComplianceTask[];
  filingsChart: FilingChartDatum[];
  completionChart: CompletionChartDatum[];
  health: ClientHealth[];
  activity: ActivityItem[];
  notifications: NotificationItem[];
}

export const dashboardPayloadTemplate: DashboardPayload = {
  stats: [
    { id: "total-clients", label: "Total Clients", value: 214, format: "number", trend: 8 },
    { id: "gst-due", label: "GST Returns Due", value: 47, format: "number", trend: -3, tone: "urgent" },
    { id: "pending-tasks", label: "Pending Tasks", value: 126, format: "number", trend: 11, tone: "urgent" },
    { id: "monthly-revenue", label: "Revenue This Month", value: 3485000, format: "currency", trend: 14 },
  ],
  tasks: [
    {
      id: "tsk-1",
      clientName: "Maheshwari Textiles LLP",
      taskType: "GSTR-3B Filing",
      dueDate: "2026-03-07",
      assignee: "AK",
      status: "pending",
      done: false,
    },
    {
      id: "tsk-2",
      clientName: "Pragati Engineering Pvt Ltd",
      taskType: "TDS Return Q4",
      dueDate: "2026-03-10",
      assignee: "RM",
      status: "in_progress",
      done: false,
    },
    {
      id: "tsk-3",
      clientName: "Aarav Retail India",
      taskType: "ITR Verification",
      dueDate: "2026-03-06",
      assignee: "SN",
      status: "late",
      done: false,
    },
    {
      id: "tsk-4",
      clientName: "Surya Foods and Beverages",
      taskType: "ROC AOC-4",
      dueDate: "2026-03-18",
      assignee: "VM",
      status: "pending",
      done: false,
    },
    {
      id: "tsk-5",
      clientName: "Narmada Infra Projects",
      taskType: "Notice Reply Draft",
      dueDate: "2026-03-05",
      assignee: "KD",
      status: "late",
      done: false,
    },
    {
      id: "tsk-6",
      clientName: "Saanvi Diagnostics",
      taskType: "GSTR-1 Review",
      dueDate: "2026-03-12",
      assignee: "AK",
      status: "in_progress",
      done: false,
    },
    {
      id: "tsk-7",
      clientName: "Udaan Mobility Solutions",
      taskType: "Advance Tax Advisory",
      dueDate: "2026-03-20",
      assignee: "RM",
      status: "pending",
      done: false,
    },
    {
      id: "tsk-8",
      clientName: "Neelkanth Chemicals",
      taskType: "GST 2B Reconciliation",
      dueDate: "2026-03-09",
      assignee: "SN",
      status: "pending",
      done: false,
    },
  ],
  filingsChart: [
    { module: "GST", filings: 84 },
    { module: "ITR", filings: 38 },
    { module: "TDS", filings: 57 },
    { module: "ROC", filings: 29 },
  ],
  completionChart: [
    { name: "Completed", value: 72, color: "#0B6E6E" },
    { name: "Open", value: 20, color: "#F5A623" },
    { name: "Overdue", value: 8, color: "#FF6B1A" },
  ],
  health: [
    { id: "h-1", clientName: "Maheshwari Textiles LLP", score: 92, status: "healthy" },
    { id: "h-2", clientName: "Pragati Engineering Pvt Ltd", score: 84, status: "healthy" },
    { id: "h-3", clientName: "Aarav Retail India", score: 69, status: "warning" },
    { id: "h-4", clientName: "Narmada Infra Projects", score: 58, status: "critical" },
    { id: "h-5", clientName: "Saanvi Diagnostics", score: 76, status: "warning" },
  ],
  activity: [
    {
      id: "a-1",
      type: "filing",
      description: "GSTR-3B filed successfully",
      clientName: "Maheshwari Textiles LLP",
      timestamp: "2 mins ago",
    },
    {
      id: "a-2",
      type: "document",
      description: "Bank statement received on WhatsApp",
      clientName: "Udaan Mobility Solutions",
      timestamp: "16 mins ago",
    },
    {
      id: "a-3",
      type: "notice",
      description: "AI draft prepared for GST notice",
      clientName: "Narmada Infra Projects",
      timestamp: "48 mins ago",
    },
    {
      id: "a-4",
      type: "filing",
      description: "TDS return marked ready for partner review",
      clientName: "Pragati Engineering Pvt Ltd",
      timestamp: "1 hour ago",
    },
  ],
  notifications: [
    {
      id: "n-1",
      type: "filing_confirmation",
      title: "Filing Confirmed",
      message: "GSTR-1 acknowledged for Maheshwari Textiles LLP.",
      unread: true,
    },
    {
      id: "n-2",
      type: "deadline",
      title: "Deadline in 1 day",
      message: "ITR verification due for Aarav Retail India.",
      unread: true,
    },
    {
      id: "n-3",
      type: "whatsapp_document",
      title: "New WhatsApp Document",
      message: "Form 16 uploaded by Saanvi Diagnostics.",
      unread: true,
    },
    {
      id: "n-4",
      type: "regulatory_alert",
      title: "Regulatory Update",
      message: "CBDT circular update pushed to advisory queue.",
      unread: false,
    },
  ],
};

export const commandItems: CommandItem[] = [
  { id: "c-1", type: "client", name: "Maheshwari Textiles LLP", context: "Client profile", href: "/dashboard/clients" },
  { id: "c-2", type: "client", name: "Pragati Engineering Pvt Ltd", context: "Client profile", href: "/dashboard/clients" },
  { id: "c-3", type: "task", name: "GSTR-3B Filing", context: "Due 07/03/2026", href: "/dashboard/compliance" },
  { id: "c-4", type: "task", name: "Notice Reply Draft", context: "Overdue", href: "/dashboard/compliance" },
  { id: "c-5", type: "deadline", name: "TDS Return Q4", context: "Due 10/03/2026", href: "/dashboard/compliance" },
  { id: "c-6", type: "settings", name: "Integration Settings", context: "Firm settings", href: "/dashboard/settings" },
];

export async function fetchDashboardPayload(): Promise<DashboardPayload> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return structuredClone(dashboardPayloadTemplate);
}

export async function toggleTaskStatus(taskId: string, done: boolean): Promise<{ id: string; done: boolean }> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  if (Math.random() < 0.2) {
    throw new Error("Could not save status.");
  }

  return { id: taskId, done };
}

