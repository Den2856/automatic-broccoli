import type { FormEvent } from "react"
import SectionHeading from "../ui/SectionHeading"
import type { ServiceContactVariant } from "./serviceContent"

type ServiceContactSectionProps = {
  eyebrow: string
  title: string
  imageSrc: string
  imageAlt: string
  imageObjectPosition?: string
  variant: ServiceContactVariant
}

type InputField = {
  kind: "input"
  name: string
  label: string
  placeholder: string
  inputType?: "text" | "tel" | "number"
  colSpan?: "full" | "half"
}

type SelectField = {
  kind: "select"
  name: string
  label: string
  placeholder: string
  options: Array<{ value: string; label: string }>
  colSpan?: "full" | "half"
}

type FormField = InputField | SelectField

type FormVariantConfig = {
  fields: FormField[]
  messagePlaceholder: string
}

const formVariantConfig: Record<ServiceContactVariant, FormVariantConfig> = {
  financing: {
    fields: [
      {
        kind: "input",
        name: "fullName",
        label: "Full Name",
        placeholder: "Your full name",
      },
      {
        kind: "input",
        name: "phone",
        label: "Phone",
        placeholder: "Phone Number",
        inputType: "tel",
      },
      {
        kind: "select",
        name: "purchaseBudget",
        label: "Purchase Budget",
        placeholder: "Select budget range",
        colSpan: "full",
        options: [
          { value: "under-25k", label: "Under $25,000" },
          { value: "25k-40k", label: "$25,000 - $40,000" },
          { value: "40k-60k", label: "$40,000 - $60,000" },
          { value: "60k-plus", label: "$60,000+" },
        ],
      },
    ],
    messagePlaceholder: "Tell us about your financing needs",
  },
  "trade-in": {
    fields: [
      {
        kind: "input",
        name: "fullName",
        label: "Full Name",
        placeholder: "Your full name",
      },
      {
        kind: "input",
        name: "phone",
        label: "Phone",
        placeholder: "Phone Number",
        inputType: "tel",
      },
      {
        kind: "input",
        name: "vehicleModel",
        label: "Vehicle Model",
        placeholder: "e.g. Hyundai Sonata",
        colSpan: "full",
      },
      {
        kind: "input",
        name: "vehicleYear",
        label: "Vehicle Year",
        placeholder: "e.g. 2020",
      },
      {
        kind: "input",
        name: "estimatedMileage",
        label: "Estimated Mileage",
        placeholder: "e.g. 45,000 miles",
      },
    ],
    messagePlaceholder: "Additional details about your vehicle",
  },
  contact: {
    fields: [
      {
        kind: "input",
        name: "fullName",
        label: "Full Name",
        placeholder: "Your full name",
      },
      {
        kind: "input",
        name: "phone",
        label: "Phone",
        placeholder: "Phone Number",
        inputType: "tel",
      },
      {
        kind: "select",
        name: "serviceType",
        label: "Service Type",
        placeholder: "Select a service type",
        colSpan: "full",
        options: [
          { value: "buy-a-vehicle", label: "Buy a vehicle" },
          { value: "financing-options", label: "Financing options" },
          { value: "trade-in", label: "Trade-in" },
          { value: "general-question", label: "General question" },
        ],
      },
    ],
    messagePlaceholder: "Tell us how we can help",
  },
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

function fieldClassName(field: FormField) {
  return cx("block", field.colSpan === "full" && "md:col-span-2")
}

function labelClassName() {
  return "mb-2 block text-[14px] font-normal leading-[1.5] tracking-[-0.01em] text-obsidian"
}

function controlClassName() {
  return "h-[52px] w-full rounded-[8px] border border-border-soft bg-paper px-4 text-[14px] text-obsidian outline-none transition-colors duration-200 placeholder:text-graphite focus:border-obsidian/24"
}

function renderField(field: FormField) {
  if (field.kind === "select") {
    return (
      <label key={field.name} className={fieldClassName(field)}>
        <span className={labelClassName()}>{field.label}</span>
        <select
          name={field.name}
          className={controlClassName()}
          defaultValue=""
          required
        >
          <option value="" disabled>
            {field.placeholder}
          </option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>
    )
  }

  return (
    <label key={field.name} className={fieldClassName(field)}>
      <span className={labelClassName()}>{field.label}</span>
      <input
        type={field.inputType || "text"}
        name={field.name}
        placeholder={field.placeholder}
        required
        className={controlClassName()}
      />
    </label>
  )
}

export default function ServiceContactSection({
  eyebrow,
  title,
  imageSrc,
  imageAlt,
  imageObjectPosition = "center",
  variant,
}: ServiceContactSectionProps) {
  const config = formVariantConfig[variant]

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <section className="bg-paper px-4 py-[72px] md:px-6 md:py-[92px] xl:px-10 xl:py-[110px]">
      <div className="mx-auto max-w-[1800px]">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          align="center"
          titleSize="lg"
          maxWidth="md"
          className="mx-auto"
        />

        <div className="mt-12 grid gap-3 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="overflow-hidden rounded-[10px] bg-cloud">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="aspect-[1/1] h-full w-full object-cover"
              style={{ objectPosition: imageObjectPosition }}
              loading="lazy"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-[10px] border border-border-soft px-4 py-4 md:px-6 md:py-5"
          >
            <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
              {config.fields.map(renderField)}

              <label className="block md:col-span-2">
                <span className={labelClassName()}>Message (Optional)</span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder={config.messagePlaceholder}
                  className="min-h-[166px] w-full resize-none rounded-[8px] border border-border-soft bg-paper px-4 py-4 text-[14px] text-obsidian outline-none transition-colors duration-200 placeholder:text-graphite focus:border-obsidian/24"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-4 inline-flex h-[52px] w-full items-center justify-center rounded-[5px] bg-obsidian px-5 text-[14px] font-medium text-paper transition-opacity duration-200 hover:opacity-92"
            >
              Submit
            </button>

            <label className="mt-4 flex items-center gap-3 text-[13px] leading-[1.6] tracking-[-0.01em] text-graphite">
              <input
                type="checkbox"
                required
                className="h-4 w-4 rounded border border-border-soft accent-obsidian"
              />
              <span>
                By submitting, you agree to our{" "}
                <a
                  href="/legal/privacy-policy"
                  className="text-obsidian transition-opacity duration-200 hover:opacity-75"
                >
                  Privacy Policy.
                </a>
              </span>
            </label>
          </form>
        </div>
      </div>
    </section>
  )
}
