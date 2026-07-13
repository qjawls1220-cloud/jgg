import { sponsors } from "../data/siteData";

export default function Sponsors() {
  return (
    <section id="sponsors">
      <div className="section-inner">
        <div className="sponsors-label">파트너 & 스폰서</div>
        <div className="sponsors-row">
          {sponsors.map((sponsor) => (
            <div className="sponsor-item" key={sponsor}>
              {sponsor}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
