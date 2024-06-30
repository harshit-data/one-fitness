"use client"
import {DashboardMonthlyView } from "@/components/dashboard-monthly-view";
import { DashboardHeader } from "@/components/dashboard-header";
const Page = () => {
  return (
    <div>
      <div>
        <DashboardHeader />
      </div>
      <div>
        <DashboardMonthlyView />
      </div>
    </div>
  )
}
export default Page
