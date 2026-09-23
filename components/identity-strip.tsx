import { identityStrip } from "@/config/site";

/**
 * A thin editorial metadata strip: who he is, in five honest facts.
 */
export function IdentityStrip() {
  return (
    <section className="identity" aria-label="Profile summary">
      <div className="shell identity__inner">
        {identityStrip.map((item) => (
          <span className="identity__item" key={item}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
