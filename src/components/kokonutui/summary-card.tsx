"use client";

import { ReactNode, useState, useCallback, useRef, useEffect } from "react";
import { AreaChart, ValueFormatter } from "@tremor/react";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface SummaryCardProps {
  label: string;
  value: string;
  change: string;
  percentage?: string;
  icon: ReactNode;
  trend: 'up' | 'down';
  chartData: ChartDataPoint[];
  onClick?: () => void;
  valueFormatter?: ValueFormatter;
}

export function SummaryCard({
  label,
  value,
  change,
  percentage,
  icon,
  trend,
  chartData,
  onClick,
  valueFormatter = (value: number) => value.toLocaleString(),
}: SummaryCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle hover state with smooth transitions
  useEffect(() => {
    // Clear any existing timeouts and intervals
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (isHovering) {
      // Gradually increase opacity for a smooth transition
      let opacity = 0;
      intervalRef.current = setInterval(() => {
        opacity += 0.1;
        setHoverOpacity(opacity);
        if (opacity >= 1) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
        }
      }, 20);
    } else {
      // Gradually decrease opacity for a smooth exit
      timeoutRef.current = setTimeout(() => {
        let opacity = 1;
        intervalRef.current = setInterval(() => {
          opacity -= 0.1;
          setHoverOpacity(Math.max(0, opacity));
          if (opacity <= 0) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
          }
        }, 20);
      }, 100);
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovering]);

  // Memoize the formatter function to avoid unnecessary re-renders
  const formatValue = useCallback((value: number) => {
    return valueFormatter(value);
  }, [valueFormatter]);

  // Memoize the click handler
  const handleClick = useCallback(() => {
    if (onClick) onClick();
  }, [onClick]);

  return (
    <div
      className={cn(
        "card-base card-glow relative overflow-hidden group",
        trend === 'up' ? "glow-success" : "glow-error"
      )}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleClick}
    >
      {/* Gradient overlay */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
        trend === 'up' ? "bg-gradient-to-br from-success/30 to-transparent" : "bg-gradient-to-br from-error/30 to-transparent"
      )} />

      <div className="card-content relative z-10">
        {/* Header with icon and trend indicator */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className={cn(
              "icon-container",
              trend === 'up' ? "bg-success/10" : "bg-error/10"
            )}>
              {icon}
            </div>
            <p className="metric-label uppercase tracking-wider">{label}</p>
          </div>
          <button className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/50">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>

        {/* Main content */}
        <div className="space-y-2 mb-3">
          <p className="metric-value">{value}</p>
          <div className="flex items-center">
            <p className={cn(
              "metric-change font-medium opacity-70",
              trend === 'up' ? "text-success" : "text-error"
            )}>
              {change}
            </p>
          </div>
        </div>

        {/* Tremor Chart Container */}
        <div className="h-24 w-full mb-3 relative">
          {/* Base chart that fades out on hover */}
          <div
            className="absolute inset-0 z-10 transition-all duration-300"
            style={{ opacity: 1 - hoverOpacity }}
          >
            <AreaChart
              className="h-full w-full"
              data={chartData}
              index="date"
              categories={["value"]}
              colors={[trend === 'up' ? "emerald" : "rose"]}
              showXAxis={false}
              showYAxis={false}
              showLegend={false}
              showGridLines={false}
              showAnimation={true}
              autoMinValue={true}
              curveType="natural"
              valueFormatter={formatValue}
              showTooltip={false}
            />
          </div>

          {/* Interactive chart that fades in on hover */}
          <div
            className="absolute inset-0 z-20 transition-all duration-300"
            style={{ opacity: hoverOpacity }}
          >
            <AreaChart
              className="h-full w-full"
              data={chartData}
              index="date"
              categories={["value"]}
              colors={[trend === 'up' ? "emerald" : "rose"]}
              showXAxis={true}
              showYAxis={false}
              showLegend={false}
              showGridLines={false}
              showAnimation={false}
              autoMinValue={true}
              curveType="natural"
              valueFormatter={formatValue}
              showTooltip={true}
              customTooltip={({ payload, active }) => {
                if (!active || !payload || !payload.length) return null;

                return (
                  <div className="rounded-tremor-default bg-tremor-background p-2 shadow-tremor-dropdown border border-tremor-border">
                    <div className="flex flex-col space-y-1">
                      <p className="text-tremor-default text-tremor-content">
                        {payload[0]?.payload.date}
                      </p>
                      <p className="text-tremor-default font-medium text-tremor-content-emphasis">
                        {formatValue(payload[0]?.value as number)}
                      </p>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}