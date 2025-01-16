import GroupHeader from "./GroupHeader";
import GroupBody from "./GroupBody";

import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../components/ui/card.jsx";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../../components/ui/accordion.jsx";

import { Separator } from "../../components/ui/separator.jsx";

const Group = () => {
	return (
		<>
			<div className="p-20">
				<GroupHeader />
				<div className="flex justify-between my-10">
					<GroupBody />
					<Card className="mt-16 ml-10 self-start">
						<CardHeader className="pb-3">
							<CardTitle>Welcome to the group</CardTitle>
							<CardDescription className="max-w-lg text-balance leading-relaxed">
								Kindly read throught the below rules before
								posting anything.
							</CardDescription>
						</CardHeader>
						<CardFooter className="flex flex-col items-start">
							<ul className="font-bold max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400 pb-5">
								<li className="flex items-center">
									<svg
										className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20">
										<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
									</svg>
									This Group is Verified
								</li>
								<li className="flex items-center">
									<svg
										className="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="currentColor"
										viewBox="0 0 20 20">
										<path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
									</svg>
									Follow all the rules mentioned below
								</li>
							</ul>
							<Separator className="my-4" />
							<h2 className="text-lg">Rules</h2>

							<div className="w-full">
								<Accordion
									type="single"
									collapsible
									className="w-full">
									<AccordionItem value="item-1">
										<AccordionTrigger>
											Be Respectful
										</AccordionTrigger>
										<AccordionContent>
											Treat all members with courtesy,
											even if you disagree with their
											opinions. Avoid personal attacks,
											insults, and inflammatory language.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-2">
										<AccordionTrigger>
											Stay on Topic
										</AccordionTrigger>
										<AccordionContent>
											Focus on the group's main purpose.
											While friendly conversation is
											welcome, avoid prolonged off-topic
											discussions that may drown out
											relevant content.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-3">
										<AccordionTrigger>
											Accuracy and Credibility
										</AccordionTrigger>
										<AccordionContent>
											Share information that is truthful
											and verifiable. If unsure about
											something, clarify it as an opinion
											or question, not a fact.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-4">
										<AccordionTrigger>
											No Spam or Self-Promotion
										</AccordionTrigger>
										<AccordionContent>
											Avoid excessive promotional content
											for yourself or others. This
											includes unsolicited sales pitches,
											advertisements, or irrelevant links.
										</AccordionContent>
									</AccordionItem>
									<AccordionItem value="item-5">
										<AccordionTrigger>
											Privacy and Confidentiality:
										</AccordionTrigger>
										<AccordionContent>
											Respect the privacy of others. Avoid
											sharing personal information without
											their consent
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</>
	);
};

export default Group;
