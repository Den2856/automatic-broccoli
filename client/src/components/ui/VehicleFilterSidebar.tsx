import type {
  VehicleFilterGroup,
  VehicleFilters,
  VehicleFilterKey,
  VehicleFilterRange,
} from "../../utils/vehicleFilters"

type VehicleFilterSidebarProps = {
  filters: VehicleFilters
  onChange: (nextFilters: VehicleFilters) => void
  groups: VehicleFilterGroup[]
  mileageBounds: VehicleFilterRange
  priceBounds: VehicleFilterRange
  className?: string
}

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ")
}

function normalizeValue(value: string) {
  return value.trim().toLowerCase()
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function formatRangeValue(
  value: number,
  { prefix = "", suffix = "" }: { prefix?: string; suffix?: string } = {}
) {
  return `${prefix}${Math.round(value)}${suffix}`
}

function CheckboxRow({
  label,
  checked,
  onToggle,
}: {
  label: string
  checked: boolean
  onToggle: () => void
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-[15px] font-normal leading-[1.5] tracking-[-0.01em] text-graphite">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="sr-only"
      />

      <span
        aria-hidden="true"
        className={cx(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors duration-200",
          checked
            ? "border-obsidian bg-obsidian"
            : "border-border-soft bg-paper"
        )}
      >
        {checked ? (
          <svg
            viewBox="0 0 12 12"
            className="h-[9px] w-[9px] text-paper"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 6.1L4.65 8.5L9.75 3.4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : null}
      </span>

      <span>{label}</span>
    </label>
  )
}

function getRangeStep(bounds: VehicleFilterRange) {
  const rangeSize = Math.max(bounds.max - bounds.min, 0)

  if (rangeSize <= 1000) {
    return 50
  }

  if (rangeSize <= 10000) {
    return 100
  }

  if (rangeSize <= 50000) {
    return 500
  }

  return 1000
}

function RangeSlider({
  label,
  value,
  bounds,
  onChange,
  prefix,
  suffix,
}: {
  label: string
  value: VehicleFilterRange
  bounds: VehicleFilterRange
  onChange: (nextValue: VehicleFilterRange) => void
  prefix?: string
  suffix?: string
}) {
  const hasRange = bounds.max > bounds.min
  const rangeSize = hasRange ? bounds.max - bounds.min : 1
  const left = ((value.min - bounds.min) / rangeSize) * 100
  const right = ((value.max - bounds.min) / rangeSize) * 100
  const step = getRangeStep(bounds)

  function handleMinChange(nextMin: number) {
    onChange({
      min: clamp(nextMin, bounds.min, value.max),
      max: value.max,
    })
  }

  function handleMaxChange(nextMax: number) {
    onChange({
      min: value.min,
      max: clamp(nextMax, value.min, bounds.max),
    })
  }

  return (
    <div className="space-y-[10px]">
      <h3 className="text-[16px] font-normal leading-[1.5] tracking-[-0.02em] text-obsidian">
        {label}
      </h3>

      <p className="text-[15px] font-normal leading-[1.5] tracking-[-0.01em] text-obsidian">
        {formatRangeValue(value.min, { prefix, suffix })} -{" "}
        {formatRangeValue(value.max, { prefix, suffix })}
      </p>

      <div className="relative h-5">
        <div className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-border-soft" />
        <div
          className="absolute top-1/2 h-px -translate-y-1/2 bg-obsidian"
          style={{
            left: `${left}%`,
            width: `${Math.max(right - left, 0)}%`,
          }}
        />

        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={step}
          value={value.min}
          disabled={!hasRange}
          onChange={(event) => handleMinChange(Number(event.target.value))}
          className="vehicle-range-input z-[2]"
          aria-label={`${label} minimum`}
        />

        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={step}
          value={value.max}
          disabled={!hasRange}
          onChange={(event) => handleMaxChange(Number(event.target.value))}
          className="vehicle-range-input z-[3]"
          aria-label={`${label} maximum`}
        />
      </div>
    </div>
  )
}

export default function VehicleFilterSidebar({
  filters,
  onChange,
  groups,
  mileageBounds,
  priceBounds,
  className,
}: VehicleFilterSidebarProps) {
  function toggleOption(group: VehicleFilterKey, optionValue: string) {
    const currentValues = filters[group]
    const normalizedOptionValue = normalizeValue(optionValue)
    const hasOption = currentValues.some(
      (value) => normalizeValue(value) === normalizedOptionValue
    )

    const nextValues = hasOption
      ? currentValues.filter(
          (value) => normalizeValue(value) !== normalizedOptionValue
        )
      : [...currentValues, optionValue]

    onChange({
      ...filters,
      [group]: nextValues,
    })
  }

  function isSelected(group: VehicleFilterKey, optionValue: string) {
    return filters[group].some(
      (value) => normalizeValue(value) === normalizeValue(optionValue)
    )
  }

  return (
    <aside
      className={cx(
        "w-full rounded-[12px] border border-border-soft bg-paper p-6",
        className
      )}
    >
      <div className="space-y-[22px]">
        {groups.map((group) => (
          <div key={group.key} className="space-y-3">
            <h3 className="text-[16px] font-normal leading-[1.5] tracking-[-0.02em] text-obsidian">
              {group.title}
            </h3>

            <div className="space-y-3">
              {group.options.map((option) => (
                <CheckboxRow
                  key={option.value}
                  label={option.label}
                  checked={isSelected(group.key, option.value)}
                  onToggle={() => toggleOption(group.key, option.value)}
                />
              ))}
            </div>
          </div>
        ))}

        <RangeSlider
          label="Mileage"
          value={filters.mileage}
          bounds={mileageBounds}
          onChange={(nextValue) =>
            onChange({
              ...filters,
              mileage: nextValue,
            })
          }
          suffix="mi"
        />

        <RangeSlider
          label="Price"
          value={filters.price}
          bounds={priceBounds}
          onChange={(nextValue) =>
            onChange({
              ...filters,
              price: nextValue,
            })
          }
          prefix="$"
        />
      </div>
    </aside>
  )
}
