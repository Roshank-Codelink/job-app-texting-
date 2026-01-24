"use client"

import { Button } from "@/Components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/Components/ui/field"
import { Input } from "@/Components/ui/input"

export default function AdminSignin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold">
              Admin Login
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Enter your credentials to access admin panel
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              <FieldGroup>
                {/* Email */}
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    className="h-11"
                  />
                </Field>

                {/* Password */}
                <Field>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <a
                      href="#"
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    className="h-11"
                  />
                </Field>

                {/* Actions */}
                <Field className="space-y-3 pt-2">
                  <Button type="submit" className="w-full h-11">
                    Login
                  </Button>

                  <Button
                    variant="outline"
                    type="button"
                    className="w-full h-11"
                  >
                    Login with Google
                  </Button>

                  <FieldDescription className="text-center text-xs sm:text-sm">
                    Admin access only
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
