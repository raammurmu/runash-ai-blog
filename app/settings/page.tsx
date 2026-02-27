"use client"

 
import { useRef, useState } from "react"
import { Bell, ImagePlus, KeyRound, ShieldCheck, UserCircle2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { authors } from "@/lib/blog-data"
import { toast } from "sonner"

export default function SettingsPage() {
  const currentUser = authors[0]
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.avatar || "/placeholder-user.jpg")
  const [logoUrl, setLogoUrl] = useState("/placeholder-logo.svg")
  const inputRef = useRef<HTMLInputElement>(null)
  const logoRef = useRef<HTMLInputElement>(null)

  const uploadImage = async (file: File, onDone: (url: string) => void) => {
    const form = new FormData()
    form.append("file", file)
    const response = await fetch("/api/upload", { method: "POST", body: form })
    const data = await response.json()
    if (!response.ok) throw new Error(data?.error || "Upload failed")
    onDone(data.url)
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 md:px-8">
      <section className="rounded-3xl border border-orange-100 bg-gradient-to-r from-white via-orange-50/40 to-amber-50/20 p-6 shadow-sm dark:border-orange-900/30 dark:from-gray-950 dark:via-gray-950 dark:to-orange-950/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Badge className="mb-3 rounded-full bg-orange-100 px-3 py-1 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/40 dark:text-orange-200">
              Account center
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
            <p className="mt-2 text-sm text-muted-foreground">
 
              Manage your publishing profile, notifications, API access, and media assets from one dashboard.

              Manage your publishing profile, notifications, and API access from one dashboard.

            </p>
          </div>
          <div className="rounded-2xl border border-orange-200/70 bg-white/80 px-4 py-3 text-sm dark:border-orange-900/40 dark:bg-gray-900/70">
            <p className="font-semibold">{currentUser?.name}</p>
            <p className="text-muted-foreground">@{currentUser?.username}</p>
          </div>
        </div>
      </section>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid h-auto w-full grid-cols-3 gap-2 rounded-2xl bg-muted/50 p-1">
          <TabsTrigger value="account" className="rounded-xl py-2.5">
            <UserCircle2 className="mr-2 h-4 w-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-xl py-2.5">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="api" className="rounded-xl py-2.5">
            <KeyRound className="mr-2 h-4 w-4" /> API Keys
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
 
              <CardDescription>Update your account details and upload profile/logo images.</CardDescription>

              <CardDescription>Update your account details and public persona.</CardDescription>

            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <img src={avatarUrl} alt="Profile avatar" className="h-16 w-16 rounded-2xl object-cover ring-2 ring-orange-200/80" />
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (event) => {
                      const file = event.target.files?.[0]
                      if (!file) return
                      try {
                        await uploadImage(file, setAvatarUrl)
                        toast.success("Profile image uploaded")
                      } catch (error) {
                        toast.error("Failed to upload profile image")
                      }
                    }}
                  />
                  <Button variant="outline" onClick={() => inputRef.current?.click()}>
                    <ImagePlus className="mr-2 h-4 w-4" /> Upload profile
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <img src={logoUrl} alt="Brand logo" className="h-16 w-16 rounded-2xl object-cover ring-2 ring-orange-200/80" />
                <div className="flex gap-2">
                  <input
                    ref={logoRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={async (event) => {
                      const file = event.target.files?.[0]
                      if (!file) return
                      try {
                        await uploadImage(file, setLogoUrl)
                        toast.success("Logo uploaded (use this URL for branding)")
                      } catch (error) {
                        toast.error("Failed to upload logo")
                      }
                    }}
                  />
                  <Button variant="outline" onClick={() => logoRef.current?.click()}>
                    <ImagePlus className="mr-2 h-4 w-4" /> Upload logo
                  </Button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Display Name</Label>
                <Input id="name" value={currentUser?.name ?? ""} readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" value={currentUser?.email ?? ""} readOnly />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="default" disabled>
                Managed by account provisioning
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose which publishing and engagement updates you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="font-medium">Weekly performance summary</p>
                  <p className="text-sm text-muted-foreground">Get post impressions and top-read articles every Friday.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="font-medium">Comment alerts</p>
                  <p className="text-sm text-muted-foreground">Receive instant updates when readers comment on your posts.</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div>
                  <p className="font-medium">Product launch announcements</p>
                  <p className="text-sm text-muted-foreground">Know when new editor features and APIs become available.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Global API Keys</CardTitle>
              <CardDescription>Use these keys to authenticate your streaming and AI requests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-xl border border-dashed p-4">
                <p className="inline-flex items-center gap-2 text-sm font-medium">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" /> Keys are stored securely and rotated by the account portal.
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  API keys are managed in the RunAsh account portal. Contact support to rotate or revoke keys.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
