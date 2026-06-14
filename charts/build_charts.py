#!/usr/bin/env python3
"""Reproducible charts for the RBNT Token Utility Report.
Reads only cited values from ../data/*.csv and writes PNGs to this folder.
Run:  python3 charts/build_charts.py   (from the report root)
"""
import csv, os
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "..", "data")

RED = "#e23b54"      # Redbelly accent
INK = "#11151d"
SLATE = ["#e23b54", "#1577e8", "#16c0c8", "#f5a623", "#7c6cf2", "#8b94a6"]

def read(name):
    with open(os.path.join(DATA, name)) as f:
        return list(csv.DictReader(f))

def style(ax):
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.tick_params(colors=INK)
    for s in ("left", "bottom"):
        ax.spines[s].set_color("#c8d0dd")

# 1. Allocation pie
rows = read("allocation.csv")
labels = [r["category"] for r in rows]
vals = [float(r["percent"]) for r in rows]
fig, ax = plt.subplots(figsize=(7, 5))
w, *_ = ax.pie(vals, labels=None, colors=SLATE, startangle=90,
               wedgeprops=dict(width=0.42, edgecolor="white"))
ax.legend([f"{l} · {v:.0f}%" for l, v in zip(labels, vals)],
          loc="center left", bbox_to_anchor=(0.92, 0.5), frameon=False, fontsize=10)
ax.set_title("RBNT allocation (10B fixed supply) · whitepaper §5.2", color=INK, fontsize=12, weight="bold")
fig.savefig(os.path.join(HERE, "allocation.png"), dpi=150, bbox_inches="tight")
plt.close(fig)

# 2. Fee distribution (low vs high volume)
rows = read("fee-distribution.csv")
recips = [r["recipient"] for r in rows]
low = [float(r["low_volume_pct"]) for r in rows]
high = [float(r["high_volume_pct"]) for r in rows]
x = range(len(recips))
fig, ax = plt.subplots(figsize=(8, 4.5))
ax.bar([i - 0.2 for i in x], low, width=0.4, label="Low volume", color="#1577e8")
ax.bar([i + 0.2 for i in x], high, width=0.4, label="High volume", color=RED)
ax.set_xticks(list(x)); ax.set_xticklabels(recips, fontsize=10)
ax.set_ylabel("% of network fees"); ax.legend(frameon=False)
ax.set_title("Network fee distribution by volume tier · vine/network-fees/distribution", color=INK, fontsize=12, weight="bold")
style(ax)
fig.savefig(os.path.join(HERE, "fee-distribution.png"), dpi=150, bbox_inches="tight")
plt.close(fig)

# 3. Adoption realized vs pipeline (log scale, clearly labeled)
rows = read("adoption.csv")
m = [r["metric"] for r in rows]
v = [float(r["usd_billions"]) for r in rows]
fig, ax = plt.subplots(figsize=(7, 4))
bars = ax.barh(m, v, color=["#16c0c8", "#8b94a6"])
ax.set_xscale("log")
ax.set_xlabel("USD (billions, log scale)")
for b, val in zip(bars, v):
    ax.text(val * 1.05, b.get_y() + b.get_height()/2, f"${val:g}B", va="center", fontsize=10, color=INK)
ax.set_title("Realized on-chain vs self-reported pipeline (NOT TVL)", color=INK, fontsize=12, weight="bold")
style(ax)
fig.savefig(os.path.join(HERE, "adoption.png"), dpi=150, bbox_inches="tight")
plt.close(fig)

print("charts written:", [f for f in os.listdir(HERE) if f.endswith(".png")])
