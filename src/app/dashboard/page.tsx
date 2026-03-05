"use client";

import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  CircleAlert,
  FileCheck,
  FileText,
  IndianRupee,
  ListChecks,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { AmountCell } from "@/components/ui/AmountCell";
import { SkeletonChart } from "@/components/skeleton/SkeletonChart";
import { SkeletonStat } from "@/components/skeleton/SkeletonStat";
import { SkeletonTableRow } from "@/components/skeleton/SkeletonTableRow";
import {
  ComplianceTask,
  fetchDashboardPayload,
  toggleTaskStatus,
} from "@/lib/mock-data";
import { formatIndianNumber } from "@/utils/format";
import { useUIStore } from "@/store/ui";
import { cn } from "@/utils/cn";

const statIcons = {
  "Total Clients": Users,
  "GST Returns Due": CircleAlert,
  "Pending Tasks": ListChecks,
  "Revenue This Month": IndianRupee,
};

function dueTone(dueDate: string) {
  const now = new Date();
  const due = new Date(dueDate);
  const days = Math.ceil((due.getTime() - now.getTime()) / 86400000);

  if (days < 0) return { label: "Overdue", className: "text-red-600" };
  if (days <= 2) return { label: "1-2 days", className: "text-saffron" };
  if (days <= 7) return { label: "3-7 days", className: "text-[#8a5e00]" };
  return { label: ">7 days", className: "text-peacock-teal" };
}

function TaskRow({
  task,
  loading,
  onToggle,
}: {
  task: ComplianceTask;
  loading: boolean;
  onToggle: () => void;
}) {
  const urgency = dueTone(task.dueDate);

  return (
    <tr className="border-b border-zinc-200 text-[11px] last:border-b-0">
      <td className="px-3 py-3 font-medium text-indigo-night">{task.clientName}</td>
      <td className="px-3 py-3 text-muted-ash">{task.taskType}</td>
      <td className={cn("px-3 py-3 font-semibold", urgency.className)}>{new Date(task.dueDate).toLocaleDateString("en-IN")}</td>
      <td className="px-3 py-3">
        <span className="inline-flex size-6 items-center justify-center rounded-full bg-indigo-night text-[9px] font-semibold text-off-white">
          {task.assignee}
        </span>
      </td>
      <td className="px-3 py-3">
        {task.done ? <StatusBadge state="done" label="Done" /> : <StatusBadge state={task.status === "late" ? "late" : "pending"} />}
      </td>
      <td className="px-3 py-3 text-right">
        <Button variant="ghost" loading={loading} onClick={onToggle} className="min-h-9 px-3 py-0 text-[10px]">
          {task.done ? "Undo" : "Done"}
        </Button>
      </td>
    </tr>
  );
}

export default function DashboardPage() {
  const addToast = useUIStore((state) => state.addToast);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-payload"],
    queryFn: fetchDashboardPayload,
  });

  const [tasks, setTasks] = useState<ComplianceTask[]>([]);
  const [activeTask, setActiveTask] = useState<string | null>(null);

  useEffect(() => {
    if (data?.tasks) {
      setTasks(data.tasks);
    }
  }, [data?.tasks]);

  const taskMutation = useMutation({
    mutationFn: ({ taskId, done }: { taskId: string; done: boolean }) => toggleTaskStatus(taskId, done),
    onMutate: ({ taskId, done }) => {
      let previous: ComplianceTask[] = [];
      setTasks((current) => {
        previous = current;
        return current.map((task) =>
          task.id === taskId ? { ...task, done, status: done ? "done" : "pending" } : task,
        );
      });
      setActiveTask(taskId);
      return { previous };
    },
    onError: (_, __, context) => {
      setTasks(context?.previous ?? []);
      addToast({ tone: "error", title: "Could not save status", message: "Task was rolled back." });
    },
    onSuccess: () => {
      addToast({ tone: "success", title: "Task status updated" });
    },
    onSettled: () => {
      setActiveTask(null);
    },
  });

  const notificationList = useMemo(() => data?.notifications ?? [], [data?.notifications]);

  return (
    <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_300px]">
      <div className="space-y-5">
        <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <article key={index} className="rounded-md border border-zinc-200 bg-warm-paper p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="skeleton size-8 rounded-full" />
                    <SkeletonStat />
                  </div>
                  <div className="skeleton h-3 w-24" />
                </article>
              ))
            : data?.stats.map((stat) => {
                const Icon = statIcons[stat.label as keyof typeof statIcons] ?? Users;
                const positive = stat.trend >= 0;
                return (
                  <article key={stat.id} className="rounded-md border border-zinc-200 bg-warm-paper p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className={cn("inline-flex size-8 items-center justify-center rounded-md", stat.tone === "urgent" ? "bg-saffron/15 text-saffron" : "bg-indigo-night/10 text-indigo-night")}>
                        <Icon className="size-4" />
                      </span>
                      <span className={cn("inline-flex items-center gap-1 text-[10px] font-semibold", positive ? "text-peacock-teal" : "text-saffron")}>
                        {positive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                        {Math.abs(stat.trend)}%
                      </span>
                    </div>
                    <p className="font-display text-heading-1 text-ink-black">
                      {stat.format === "number" ? formatIndianNumber(stat.value) : <AmountCell amount={stat.value} className="text-[24px]" />}
                    </p>
                    <p className="text-[10px] text-muted-ash">{stat.label}</p>
                  </article>
                );
              })}
        </section>

        <section className="rounded-md border border-zinc-200 bg-warm-paper p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-heading-2 text-indigo-night">Compliance Calendar / Task Feed</h2>
            <span className="text-[10px] text-muted-ash">Weekly view</span>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonTableRow key={index} index={index} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-zinc-200 text-left text-[9px] uppercase tracking-[0.08em] text-muted-ash">
                    <th className="px-3 py-2">Client</th>
                    <th className="px-3 py-2">Task</th>
                    <th className="px-3 py-2">Due date</th>
                    <th className="px-3 py-2">Assignee</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <TaskRow
                      key={task.id}
                      task={task}
                      loading={activeTask === task.id && taskMutation.isPending}
                      onToggle={() => taskMutation.mutate({ taskId: task.id, done: !task.done })}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {isLoading ? (
            <>
              <SkeletonChart height={240} />
              <SkeletonChart height={240} />
            </>
          ) : (
            <>
              <motion.article
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="rounded-md border border-zinc-200 bg-warm-paper p-4"
              >
                <h3 className="mb-4 text-heading-2 text-indigo-night">Filings This Month</h3>
                <div className="h-[240px]">
                  <ResponsiveContainer>
                    <BarChart data={data?.filingsChart}>
                      <XAxis dataKey="module" stroke="#888880" fontSize={10} />
                      <YAxis stroke="#888880" fontSize={10} />
                      <Tooltip />
                      <Bar dataKey="filings" fill="#FF6B1A" radius={[4, 4, 0, 0]} animationDuration={800} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.06 }}
                className="rounded-md border border-zinc-200 bg-warm-paper p-4"
              >
                <h3 className="mb-4 text-heading-2 text-indigo-night">Task Completion Rate</h3>
                <div className="h-[240px]">
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={data?.completionChart}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        startAngle={90}
                        endAngle={-270}
                        animationDuration={800}
                      >
                        {data?.completionChart.map((entry) => (
                          <Cell key={entry.name} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.article>
            </>
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <article className="rounded-md border border-zinc-200 bg-warm-paper p-4">
            <h3 className="mb-4 text-heading-2 text-indigo-night">Client Health Overview</h3>
            <ul className="space-y-2">
              {(data?.health ?? []).map((client) => (
                <li key={client.id} className="flex items-center justify-between rounded-md border border-zinc-200 bg-off-white px-3 py-2">
                  <span className="text-[11px] font-medium text-indigo-night">{client.clientName}</span>
                  <span
                    className={cn(
                      "text-[10px] font-semibold",
                      client.status === "healthy" && "text-peacock-teal",
                      client.status === "warning" && "text-[#8a5e00]",
                      client.status === "critical" && "text-saffron",
                    )}
                  >
                    {client.score}%
                  </span>
                </li>
              ))}
            </ul>
            <a href="/dashboard/clients" className="mt-3 inline-block text-[10px] font-semibold text-peacock-teal">
              View all clients ?
            </a>
          </article>

          <article className="rounded-md border border-zinc-200 bg-warm-paper p-4">
            <h3 className="mb-4 text-heading-2 text-indigo-night">Recent Activity Feed</h3>
            <ul className="space-y-3">
              {(data?.activity ?? []).map((item) => (
                <li key={item.id} className="flex gap-2">
                  <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-indigo-night/10 text-indigo-night">
                    {item.type === "filing" ? <CheckCircle2 className="size-3" /> : item.type === "document" ? <FileText className="size-3" /> : <CircleAlert className="size-3" />}
                  </span>
                  <div>
                    <p className="text-[11px] text-indigo-night">{item.description}</p>
                    <p className="text-[10px] text-muted-ash">
                      {item.clientName} · {item.timestamp}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </div>

      <aside className="hidden space-y-3 xl:block">
        <h2 className="text-heading-2 text-indigo-night">Notifications</h2>
        {notificationList.map((item) => (
          <article key={item.id} className="rounded-md border border-zinc-200 bg-warm-paper p-3">
            <div className="mb-1 inline-flex size-7 items-center justify-center rounded-full bg-indigo-night/10 text-indigo-night">
              {item.type === "deadline" ? <CircleAlert className="size-3.5 text-saffron" /> : item.type === "whatsapp_document" ? <Bell className="size-3.5 text-peacock-teal" /> : <FileCheck className="size-3.5" />}
            </div>
            <h3 className="text-[12px] font-semibold text-indigo-night">{item.title}</h3>
            <p className="text-[10px] text-muted-ash">{item.message}</p>
          </article>
        ))}
      </aside>
    </div>
  );
}

