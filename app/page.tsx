import HomeV43Page from '../versions/home-v4-3/source/page';

/**
 * Homepage — serves the V4.3 composition.
 *
 * Plant Anatomy is the hero (intro copy over the 3D plant aerial, scroll crossfade into the
 * stage tour), followed by Stats, Founder Legacy, Company History, Stakeholder paths, Products
 * (rotating 3D bag), Sustainability, Iconic Projects and the footer.
 *
 * Edit versions/home-v4-3/source/ to change it. The previous homepage composition is still
 * available at /sample-v3, and the isolated V4.3 preview at /home-v4-3. Page title and
 * description come from app/layout.tsx.
 */
export default function HomePage() {
  return <HomeV43Page />;
}
