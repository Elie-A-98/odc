import { styled } from "@linaria/react";
import { cssFluidClamp, themeToken } from "../../design/styling/theme/theme";
import { SmartImage } from "../../design/components/smart-image";

const PAGE_HORIZONTAL_PADDING_PX = cssFluidClamp(30, 40);

const HeroSection = styled.section`
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  margin: ${themeToken("spacing-m")} ${PAGE_HORIZONTAL_PADDING_PX};
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #1f3b2d;
  isolation: isolate;
`;

const HeroImage = styled(SmartImage)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;

  ${HeroSection}:hover & {
    transform: scale(1.05);
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    #102219 0%,
    rgba(16, 34, 25, 0.8) 50%,
    transparent 100%
  );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  padding: ${themeToken("spacing-l")} ${themeToken("spacing-m")};
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: ${themeToken("spacing-m")};
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${themeToken("spacing-xs")};
  padding: ${themeToken("spacing-xs")} ${themeToken("spacing-s")};
  border-radius: 9999PX;
  background: rgba(13, 242, 128, 0.2);
  border: 1px solid rgba(13, 242, 128, 0.3);
  backdrop-filter: blur(4px);
  width: fit-content;
`;

const BadgeIcon = styled.span`
  font-size: 14px;
  color: #0df280;
`;

const BadgeText = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #0df280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const HeroTitle = styled.h1`
  font-size: ${cssFluidClamp(36, 56)};
  font-weight: 900;
  line-height: 1.1;
  color: ${themeToken("palette-text-primary")};
  letter-spacing: -0.02em;
`;

const HeroHighlight = styled.span`
  background: linear-gradient(to right, #0df280, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroDescription = styled.p`
  font-size: ${cssFluidClamp(14, 18)};
  font-weight: 500;
  line-height: 1.6;
  color: #90cbad;
  max-width: 540px;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${themeToken("spacing-s")};
  margin-top: ${themeToken("spacing-xs")};
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${themeToken("spacing-xs")};
  height: 48px;
  padding: 0 ${themeToken("spacing-m")};
  border-radius: 8px;
  background: #0df280;
  color: #102219;
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 0 20px rgba(13, 242, 128, 0.4);

  &:hover {
    transform: translateY(-2px);
    background: #0cd970;
  }
`;

const StatsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${themeToken("spacing-s")};
  padding: 0 ${PAGE_HORIZONTAL_PADDING_PX};
  margin-bottom: ${themeToken("spacing-l")};
`;

const StatCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeToken("spacing-xs")};
  padding: ${themeToken("spacing-m")};
  border-radius: 12px;
  background: #182e22;
  border: 1px solid #1f3b2d;
  transition: border-color 0.2s;
  cursor: default;

  &:hover {
    border-color: rgba(13, 242, 128, 0.5);
  }

  &:last-child {
    background: linear-gradient(to bottom right, #1f3b2d, #182e22);
    cursor: pointer;
  }
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${themeToken("spacing-xs")};
`;

const StatLabel = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #90cbad;
`;

const StatIcon = styled.span`
  font-size: 24px;
  color: #ffd700;
  transition: transform 0.2s;

  ${StatCard}:hover & {
    transform: scale(1.1);
  }
`;

const StatValue = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: ${themeToken("palette-text-primary")};
`;

const StatDescription = styled.p`
  font-size: 12px;
  color: #64748b;
`;

const PremiumContent = styled.div`
  position: relative;
  overflow: hidden;
`;

const PremiumIcon = styled.span`
  position: absolute;
  right: -16px;
  bottom: -16px;
  font-size: 100px;
  color: rgba(255, 255, 255, 0.1);
  transition: opacity 0.2s;

  ${StatCard}:hover & {
    opacity: 0.2;
  }
`;

const PremiumTitle = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: ${themeToken("palette-text-primary")};
  margin-bottom: ${themeToken("spacing-xs")};
`;

const PremiumDescription = styled.p`
  font-size: 14px;
  color: #90cbad;
  margin-bottom: ${themeToken("spacing-s")};
`;

const PremiumLink = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #ffd700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${PAGE_HORIZONTAL_PADDING_PX};
  margin-bottom: ${themeToken("spacing-m")};
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: ${themeToken("palette-text-primary")};
`;

const ViewAllLink = styled.a`
  font-size: 14px;
  font-weight: 700;
  color: #ffd700;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${themeToken("spacing-m")};
  padding: 0 ${PAGE_HORIZONTAL_PADDING_PX};
  margin-bottom: ${themeToken("spacing-m")};
`;

const CategoryCard = styled.article`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  border: 1px solid #1f3b2d;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-4px);
  }
`;

const CategoryImage = styled(SmartImage)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;

  ${CategoryCard}:hover & {
    transform: scale(1.1);
  }
`;

const CategoryOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
`;

const CategoryContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: ${themeToken("spacing-m")};
  width: 100%;
`;

const CategoryBadge = styled.p`
  font-size: 12px;
  font-weight: 700;
  color: #ffd700;
  text-transform: uppercase;
  margin-bottom: ${themeToken("spacing-xs")};
`;

const CategoryInfo = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;

const CategoryDetails = styled.div``;

const CategoryName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: ${themeToken("palette-text-primary")};
  margin-bottom: 4px;
`;

const CategoryDescription = styled.p`
  font-size: 14px;
  color: #cbd5e1;
`;

const CategoryIconWrapper = styled.div`
  background: rgba(13, 242, 128, 0.2);
  backdrop-filter: blur(16px);
  padding: ${themeToken("spacing-xs")};
  border-radius: 8px;
  color: #0df280;
  opacity: 0;
  transform: translateY(8px);
  transition: all 0.3s;

  ${CategoryCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const HomePage = () => {
  return (
    <main>
      <HeroSection>
        <HeroImage
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
          alt="Shopping district background"
          sizes="100vw"
          eager
        />
        <HeroOverlay />
        <HeroContent>
          <Badge>
            <BadgeIcon>🚀</BadgeIcon>
            <BadgeText>Holiday Season Arrival</BadgeText>
          </Badge>
          <div>
            <HeroTitle>
              Discover the <br />
              <HeroHighlight>Magic of Christmas</HeroHighlight>
            </HeroTitle>
            <HeroDescription>
              Browse our exclusive collection of premium gifts and festive
              lifestyle products. Experience curated quality where your next
              favorite item is just a click away.
            </HeroDescription>
          </div>
          <HeroActions>
            <PrimaryButton>
              <span>Start Shopping</span>
              <span>→</span>
            </PrimaryButton>
          </HeroActions>
        </HeroContent>
      </HeroSection>

      <StatsGrid>
        <StatCard>
          <StatHeader>
            <StatLabel>New Arrivals</StatLabel>
            <StatIcon>✨</StatIcon>
          </StatHeader>
          <StatValue>1,200+</StatValue>
          <StatDescription>Items added today</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatLabel>Active Brands</StatLabel>
            <StatIcon>🏪</StatIcon>
          </StatHeader>
          <StatValue>350</StatValue>
          <StatDescription>Global partners</StatDescription>
        </StatCard>

        <StatCard>
          <StatHeader>
            <StatLabel>Flash Sales</StatLabel>
            <StatIcon>⚡</StatIcon>
          </StatHeader>
          <StatValue>24</StatValue>
          <StatDescription>Ending in 2 hours</StatDescription>
        </StatCard>

        <StatCard>
          <PremiumContent>
            <PremiumIcon>💎</PremiumIcon>
            <PremiumTitle>Join Premium</PremiumTitle>
            <PremiumDescription>
              Get free shipping on all orders
            </PremiumDescription>
            <PremiumLink>
              Upgrade Now <span>→</span>
            </PremiumLink>
          </PremiumContent>
        </StatCard>
      </StatsGrid>

      <SectionHeader>
        <SectionTitle>Featured Categories</SectionTitle>
        <ViewAllLink>
          View All <span>›</span>
        </ViewAllLink>
      </SectionHeader>

      <CategoriesGrid>
        <CategoryCard>
          <CategoryImage
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Premium Audio"
            sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
          />
          <CategoryOverlay />
          <CategoryContent>
            <CategoryBadge>Audio & Sound</CategoryBadge>
            <CategoryInfo>
              <CategoryDetails>
                <CategoryName>Premium Audio</CategoryName>
                <CategoryDescription>
                  Headphones, Speakers, and more
                </CategoryDescription>
              </CategoryDetails>
              <CategoryIconWrapper>↗</CategoryIconWrapper>
            </CategoryInfo>
          </CategoryContent>
        </CategoryCard>

        <CategoryCard>
          <CategoryImage
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            alt="Smart Watches"
            sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
          />
          <CategoryOverlay />
          <CategoryContent>
            <CategoryBadge>Wearables</CategoryBadge>
            <CategoryInfo>
              <CategoryDetails>
                <CategoryName>Smart Watches</CategoryName>
                <CategoryDescription>
                  Fitness trackers & Accessories
                </CategoryDescription>
              </CategoryDetails>
              <CategoryIconWrapper>↗</CategoryIconWrapper>
            </CategoryInfo>
          </CategoryContent>
        </CategoryCard>

        <CategoryCard>
          <CategoryImage
            src="https://images.unsplash.com/photo-1593305841991-05c297ba4575"
            alt="Gaming"
            sizes="(min-width: 900px) 33vw, (min-width: 600px) 50vw, 100vw"
          />
          <CategoryOverlay />
          <CategoryContent>
            <CategoryBadge>Gaming</CategoryBadge>
            <CategoryInfo>
              <CategoryDetails>
                <CategoryName>Console & PC</CategoryName>
                <CategoryDescription>
                  Consoles, Controllers & Games
                </CategoryDescription>
              </CategoryDetails>
              <CategoryIconWrapper>↗</CategoryIconWrapper>
            </CategoryInfo>
          </CategoryContent>
        </CategoryCard>
      </CategoriesGrid>
    </main>
  );
};

export default HomePage;
