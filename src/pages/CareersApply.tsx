import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Layout from "../components/Layout";
import SectionHeading from "../components/SectionHeading";
import { Field, FormSuccess, inputClass } from "../components/FormField";
import { useSeo } from "../lib/useSeo";
import { forms } from "../data/siteConfig";
import { submitToFormspreeFormData } from "../lib/formSubmit";

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  location: z.string().min(2, "Please share your location"),
  experience: z.string().min(2, "Please tell us about your experience"),
  availability: z.string().min(2, "Please share your availability"),
  qualifications: z.string().optional(),
  introduction: z.string().min(10, "Please write a short introduction"),
});

type FormData = z.infer<typeof schema>;

export default function CareersApply() {
  useSeo({
    title: "Apply to Join Serene Hands",
    description: "Apply to join the Serene Hands caregiver team.",
  });

  const [submitted, setSubmitted] = useState(false);
  const [emailFailed, setEmailFailed] = useState(false);
  const cvInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

