'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export function ContentGuide() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-lg">
        <CardContent className="pt-6">
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mb-6">
              Understanding PC Bottlenecks: A Complete Guide to a Balanced System
            </h2>

            <p className="text-justify leading-7">
              Welcome to the ultimate resource for PC performance analysis. A <strong>bottleneck</strong> is the single most important concept to understand when building or upgrading a gaming PC. It occurs when one of your components is too slow to keep up with the others, effectively creating a "traffic jam" that limits your entire system's potential. Our <strong>PC Bottleneck Calculator</strong> is designed to instantly identify these issues for you.
            </p>

            <p className="text-justify leading-7">
              By preventing <strong>bottlenecks</strong>, you ensure that every dollar you spend on hardware translates directly into the <strong>performance</strong> you expect. A <strong>balanced PC</strong> is a powerful, efficient, and cost-effective PC.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">What is a CPU Bottleneck? (The "Bad" Bottleneck)</h3>
            <p className="text-justify leading-7">
              A <strong>CPU bottleneck</strong> happens when your processor (CPU) cannot process data and instructions fast enough to keep your graphics card (GPU) fully occupied. This is the most common and problematic type of <strong>bottleneck</strong> for gamers, as it leads to inconsistent performance that can't be fixed by simply lowering graphics settings.
            </p>

            <p><strong>Common Symptoms:</strong></p>
            <ul className="space-y-2">
              <li><strong>Stuttering</strong> or choppy gameplay, especially during intense action.</li>
              <li>Low <strong>FPS</strong> in <strong>CPU-intensive games</strong> (e.g., Valorant, Counter-Strike 2, or large-scale strategy games).</li>
              <li>Your <strong>GPU usage</strong> is unexpectedly low (e.g., 60-70%) while one or more <strong>CPU cores</strong> are at 100%.</li>
            </ul>

            <h3 className="text-xl font-semibold mt-8 mb-4">What is a GPU Bottleneck? (The "Good" Bottleneck)</h3>
            <p className="text-justify leading-7">
              A <strong>GPU bottleneck</strong>, also known as being "GPU limited," occurs when your graphics card is running at full capacity (99-100% usage). It is the component dictating your maximum <strong>frame rate</strong> because it's working as hard as possible to render the best visuals.
            </p>

            <p className="text-justify leading-7">
              <strong>This is generally the ideal scenario for gaming.</strong> It means you are getting every bit of <strong>performance</strong> you paid for out of your graphics card. This typically happens when playing graphically demanding AAA titles at high <strong>resolutions</strong> (1440p or 4K) with settings like textures and ray tracing on "Ultra."
            </p>

            <Separator className="my-10" />

            <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mb-6">
              How to Fix a Bottleneck: Your Action Plan
            </h2>

            <p className="text-justify leading-7">
              Once our calculator identifies a <strong>bottleneck</strong>, the next step is to address it. Here are the most effective, solution-oriented steps you can take for each scenario.
            </p>

            <h3 className="text-xl font-semibold mt-8 mb-4">Tackling a CPU Bottleneck</h3>
            <p className="text-justify leading-7">
              If your CPU is the weak link, your primary goal is to reduce its workload or increase its performance.
            </p>

            <p><strong>Immediate Software & Settings Fixes:</strong></p>
            <ul className="space-y-2">
              <li><strong>Close Background Applications:</strong> Shut down web browsers, streaming apps, and any unnecessary programs before you start a game.</li>
              <li><strong>Lower CPU-Intensive Game Settings:</strong> Reduce options like "Object Detail," "Physics Quality," "Crowd Density," or "View Distance."</li>
              <li><strong>Increase Resolution:</strong> Counterintuitively, increasing the resolution (e.g., 1080p → 1440p) puts more stress on the GPU, which can help balance the load.</li>
            </ul>

            <p><strong>Long-Term Hardware Solutions:</strong></p>
            <ul className="space-y-2">
              <li><strong>Overclocking:</strong> With adequate cooling, overclocking your CPU can provide a 5-15% boost to reduce minor bottlenecks.</li>
              <li><strong>Upgrade Your CPU:</strong> Use our calculator’s results to find a processor that better matches your graphics card.</li>
            </ul>

            <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
              <h5 className="text-lg font-semibold mb-3">Real-World Example: Upgrading Your CPU for a Modern GPU</h5>
              <p className="text-justify leading-7">
                Consider a user who just upgraded to a powerful graphics card like the <strong>NVIDIA RTX 4070</strong>, while still using an older but respected CPU like the <strong>AMD Ryzen 5 3600</strong>.
              </p>
              <p className="text-justify leading-7 mt-3">
                In graphically intense games at 1440p or 4K, this setup may perform well. But in competitive eSports titles at 1080p, performance hits a wall and stutters appear regardless of graphics settings.
              </p>
              <p className="text-justify leading-7 mt-3">
                <strong>The Solution:</strong> This is a clear <strong>CPU bottleneck</strong>. By upgrading to a modern CPU like the <strong>AMD Ryzen 5 7600X</strong> or <strong>Intel Core i5-14600K</strong>, the system regains balance, letting the RTX 4070 deliver smooth, high-FPS gameplay.
              </p>
            </div>

            <h3 className="text-xl font-semibold mt-8 mb-4">Managing a GPU Bottleneck</h3>
            <p className="text-justify leading-7">
              Remember, this is often a <strong>good thing</strong>. The goal isn’t to eliminate the bottleneck but to adjust it to achieve your desired <strong>frame rate</strong>.
            </p>

            <p><strong>Your Primary Levers for More FPS:</strong></p>
            <ul className="space-y-2">
              <li><strong>Lower GPU-Intensive Settings:</strong> Reduce "Texture Quality," "Shadow Quality," "Anti-Aliasing," and disable "Ray Tracing."</li>
              <li><strong>Enable Performance Scaling:</strong> Use NVIDIA DLSS, AMD FSR, or Intel XeSS in "Performance" or "Ultra Performance" mode for major FPS gains.</li>
              <li><strong>Lower Resolution:</strong> Dropping from 4K → 1440p or 1440p → 1080p drastically reduces GPU workload.</li>
              <li><strong>Upgrade Your GPU:</strong> If you want high settings and resolution, upgrading to a more powerful GPU is the ultimate solution.</li>
            </ul>

            <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
              <h5 className="text-lg font-semibold mb-3">Real-World Example: Overcoming a Mid-Range GPU Limit</h5>
              <p className="text-justify leading-7">
                A user has a capable CPU like the <strong>AMD Ryzen 5 5600X</strong> but pairs it with an older GPU like the <strong>NVIDIA GTX 1660 Super</strong>.
              </p>
              <p className="text-justify leading-7 mt-3">
                They want to play AAA titles at 1440p. While the CPU can handle the logic, the GTX 1660 Super maxes out at 100% usage and struggles to maintain smooth frame rates — a classic <strong>GPU bottleneck</strong>.
              </p>
              <p className="text-justify leading-7 mt-3">
                <strong>The Solution:</strong> Upgrading to a modern GPU like the <strong>NVIDIA RTX 4060</strong> or <strong>AMD Radeon RX 7700 XT</strong> unleashes the system’s potential, enabling high settings at 1440p with stable frame rates.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-primary border-b-2 border-border pb-3 mb-6">
              How Our Calculator Leads to a Balanced PC
            </h2>

            <p className="text-justify leading-7">
              Our tool analyzes the relationship between components so you don’t have to. By entering your parts, you get an instant, data-driven analysis that empowers you to:
            </p>

            <ul className="space-y-2">
              <li><strong>Build Smarter:</strong> Avoid pairing a high-end GPU with an entry-level CPU before buying.</li>
              <li><strong>Upgrade with Confidence:</strong> Know exactly which component to upgrade for the biggest performance gain.</li>
              <li><strong>Save Money:</strong> Don’t overspend on parts your other components can’t fully support.</li>
            </ul>

            <p className="text-justify leading-7 mt-6">
              <strong>Ready to check your build?</strong> Scroll back up and use the calculator to ensure your PC is perfectly balanced for maximum performance.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
