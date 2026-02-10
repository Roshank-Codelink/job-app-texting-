"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { toast } from "react-toastify"
import { Formik, Form, Field as FormikField, ErrorMessage } from 'formik'
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

interface AdminLoginValues {
  email: string
  password: string
}

export default function AdminSignin() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (values: AdminLoginValues) => {
    setIsLoading(true)
    try {
      const result = await signIn("admin-credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      console.log("Admin Login Result:", result)

      if ((result as any)?.error) {
        toast.error("Invalid email or password")
        return
      }

      // Add a small delay to ensure session is properly established
      await new Promise(resolve => setTimeout(resolve, 500));

      toast.success("Login successful!")
      // Middleware will handle the redirect based on role and session
      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Admin Login Error:", error)
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

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
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors: Partial<AdminLoginValues> = {}
                if (!values.email) {
                  errors.email = "Email is required"
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                  errors.email = "Invalid email address"
                }
                if (!values.password) {
                  errors.password = "Password is required"
                }
                return errors
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-4">
                  <FieldGroup>
                    {/* Email */}
                    <Field>
                      <FieldLabel htmlFor="email">Email</FieldLabel>
                      <FormikField
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="admin@example.com"
                        required
                        className="h-11"
                      />
                      <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
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
                      <FormikField
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        required
                        className="h-11"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                    </Field>

                    {/* Actions */}
                    <Field className="space-y-3 pt-2">
                      <Button 
                        type="submit" 
                        className="w-full h-11"
                        disabled={isLoading || isSubmitting}
                      >
                        {isLoading || isSubmitting ? "Logging in..." : "Login"}
                      </Button>

                      <FieldDescription className="text-center text-xs sm:text-sm">
                        Admin access only
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
