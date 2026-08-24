import React from "react";

type Resource = {
	title: string;
	description: string;
	type: string;
	href: string;
};

const resources: Resource[] = [
	{
		title: "Getting Started Guide",
		description: "A practical introduction to the tools and information available to you.",
		type: "Guide",
		href: "#getting-started",
	},
	{
		title: "Helpful Articles",
		description: "Explore clear, easy-to-follow articles on common questions and topics.",
		type: "Articles",
		href: "#articles",
	},
	{
		title: "Frequently Asked Questions",
		description: "Find quick answers to the questions people ask most often.",
		type: "FAQ",
		href: "#faq",
	},
];

export default function Resources() {
	return (
		<main style={styles.page}>
			<section style={styles.hero}>
				<p style={styles.eyebrow}>LEARNING CENTER</p>
				<h1 style={styles.heading}>Resources</h1>
				<p style={styles.intro}>
					Browse helpful guides, articles, and answers to support your next step.
				</p>
			</section>

			<section aria-label="Resource library" style={styles.grid}>
				{resources.map((resource) => (
					<article key={resource.title} style={styles.card}>
						<span style={styles.tag}>{resource.type}</span>
						<h2 style={styles.cardTitle}>{resource.title}</h2>
						<p style={styles.description}>{resource.description}</p>
						<a href={resource.href} style={styles.link}>
							View resource <span aria-hidden="true">→</span>
						</a>
					</article>
				))}
			</section>
		</main>
	);
}

const styles: Record<string, React.CSSProperties> = {
	page: {
		minHeight: "100vh",
		padding: "clamp(3rem, 8vw, 7rem) 1.5rem",
		background: "#f8fafc",
		color: "#172033",
		fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
	},
	hero: { maxWidth: "760px", margin: "0 auto 3rem", textAlign: "center" },
	eyebrow: { margin: "0 0 0.75rem", color: "#5267d8", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em" },
	heading: { margin: 0, fontSize: "clamp(2.5rem, 7vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.04em" },
	intro: { margin: "1.25rem auto 0", maxWidth: "560px", color: "#5d687c", fontSize: "1.125rem", lineHeight: 1.7 },
	grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.25rem", maxWidth: "1100px", margin: "0 auto" },
	card: { display: "flex", flexDirection: "column", padding: "1.75rem", minHeight: "250px", background: "#fff", border: "1px solid #e6eaf0", borderRadius: "1rem", boxShadow: "0 10px 30px rgba(23, 32, 51, 0.05)" },
	tag: { alignSelf: "flex-start", padding: "0.35rem 0.65rem", borderRadius: "999px", background: "#eef1ff", color: "#5267d8", fontSize: "0.75rem", fontWeight: 700 },
	cardTitle: { margin: "1.25rem 0 0.75rem", fontSize: "1.35rem" },
	description: { margin: 0, color: "#667085", lineHeight: 1.6 },
	link: { marginTop: "auto", paddingTop: "1.5rem", color: "#5267d8", fontWeight: 700, textDecoration: "none" },
};
