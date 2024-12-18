import { Check } from 'lucide-react'
import Link from "next/link"

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

export default function Pricing() {
    return (
        <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 md:p-6 lg:p-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Plans and Pricing</h1>
                <p className="text-gray-400">
                    We aim to empower everyone to seamlessly capture their ideas, thoughts, and insights in the most intuitive and unobtrusive way. Individual or an enterprise, we have a plan that fits your use case
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl w-full mb-16">
                {/* Free Tier */}
                <Card className="dark:bg-zinc-900 bg-white border-zinc-800">
                    <CardContent className="pt-6">
                        <div className="mb-4">
                            <h2 className="text-xl font-semibold mb-1">Free</h2>
                            <p className="text-sm text-gray-400">Perfect for small projects</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold">&#8377;0</span>
                            <span className="text-gray-400">/month</span>
                        </div>
                        <ul className="space-y-3 mb-6">
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-primary" />
                                <span className="text-sm">Up to 3 workspaces per user</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-primary" />
                                <span className="text-sm">Maximum of 5 documents per workspace</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-primary" />
                                <span className="text-sm">Collaboration with up to 2 users</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-primary" />
                                <span className="text-sm">Access to limited AI credits</span>
                            </li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full hover:bg-gray-200">
                            <Link href="/sign-in">Get Started</Link>
                        </Button>
                    </CardFooter>
                </Card>

                {/* Premium Tier */}
                <Card className="dark:bg-zinc-900 bg-white border-zinc-800">
                    <CardContent className="pt-6">
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-xl font-semibold">Pro</h2>
                                <span className="px-2 py-1 rounded-full bg-primary text-[10px] uppercase font-semibold">Popular</span>
                            </div>
                            <p className="text-sm text-gray-400">Perfect for growing teams</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-3xl font-bold">&#8377;59</span>
                            <span className="text-gray-400">/month</span>
                        </div>
                        <div className="mb-6">
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-primary" />
                                    <span className="text-sm">Unlimited workspaces</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-primary" />
                                    <span className="text-sm">Unlimited documents</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-primary" />
                                    <span className="text-sm">Unlimited collaborators</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-primary" />
                                    <span className="text-sm">Unlimited AI credits</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button asChild className="w-full bg-primary hover:bg-primary/90">
                            <Link href="/upgrade">Upgrade to Pro</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>

            <div className="max-w-3xl w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border-zinc-800">
                        <AccordionTrigger className="hover:no-underline">
                            Can I upgrade or downgrade my plan anytime?
                        </AccordionTrigger>
                        <AccordionContent>
                            Absolutely! You can upgrade or downgrade your plan at any time to suit your changing needs. No hidden fees or long-term commitments.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-zinc-800">
                        <AccordionTrigger className="hover:no-underline">
                            How does the AI assist in my workspace?
                        </AccordionTrigger>
                        <AccordionContent>
                            Our AI-powered tools provide document summarization, content generation, real-time suggestions, and language translation to enhance productivity and streamline workflows.                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-zinc-800">
                        <AccordionTrigger className="hover:no-underline">
                            Can I access my workspace offline?
                        </AccordionTrigger>
                        <AccordionContent>
                            Currently, our platform requires an internet connection for full functionality. However, we are working on offline capabilities for future updates.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-zinc-800">
                        <AccordionTrigger className="hover:no-underline">
                            How do credits work on the platform?
                        </AccordionTrigger>
                        <AccordionContent>
                            AI credits are used for tasks like content generation and document summarization. Free-tier users have limited credits, while pro users enjoy unlimited credits.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}