import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { InfoIcon } from "lucide-react"

export default function Billing() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Subscription & Billing</h1>
      
      <div className="border-b pb-2">
        <Button variant="link" className="px-0 font-semibold">Plan Details</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Plan Summary</h2>
                  <span className="inline-block dark:bg-black bg-gray-300 text-sm text-foreground px-2 py-0.5 rounded">Free Plan</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>185 credits left</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-gray-500">Price/Month</div>
                  <div className="font-medium">&#8377;0</div>
                </div>
                <div>
                  <div className="text-gray-500">Included Credits</div>
                  <div className="font-medium">200</div>
                </div>
                <div>
                  <div className="text-gray-500">Renewal Date</div>
                  <div className="font-medium">Dec 01, 2024</div>
                </div>
              </div>

              <Button className="w-full">Upgrade to Pro</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">On-Demand Credits</h2>
              <p className="text-gray-500 text-sm">
                You cannot buy on-demand credits without an active subscription. Please resume your subscription or choose a new plan.
              </p>
              
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-medium mb-4">Credits Balance Summary</h3>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      Current Credits Balance
                      <InfoIcon className="h-4 w-4 text-gray-500"/>
                    </div>
                    <span>185</span>
                  </div>
                </div>
                <Button className="w-full" variant="secondary">Purchase Credits</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Manage Payment Information</h2>
              <p className="text-gray-500">No payment method added.</p>
              <Button variant="outline" className="w-full">Add New Payment Method</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}