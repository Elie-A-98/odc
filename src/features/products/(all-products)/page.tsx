import { styled } from "@linaria/react";
import { useFilteredProducts } from "../../../api/products.api";
import {
  cssFluidClamp,
  themeToken,
  themeVariants,
} from "../../../design/styling/theme/theme";
import { css } from "@linaria/core";
import { Suspense, useEffect, useMemo, useState } from "react";
import StarIcon from "../../../assets/star.svg?react";
import { useFilters, type FilterValues } from "./filters/useFilters";
import { Filters } from "./filters/filters";
import _ from "lodash";
import { SmartImage } from "../../../design/components/smart-image";
import { motion } from "framer-motion";

const PAGE_HORIZONTAL_PADDING_PX = cssFluidClamp(30, 40);
const CARD_MIN_WITH_PX = 300;

const ProductsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${CARD_MIN_WITH_PX}px, 1fr));
  gap: ${themeToken("spacing-l")};
  padding-block: ${themeToken("spacing-l")};
  padding-inline: ${PAGE_HORIZONTAL_PADDING_PX};
`;

const ProductCard = styled(motion.article)`
  max-width: 500px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  border-radius: 12px;
  border: 1px solid ${themeToken("palette-borders-secondary")};
  background: ${themeToken("palette-backgrounds-card-alt")};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px ${themeToken("palette-effects-card-shadow")};
  }
`;

const ProductContent = styled.div`
  padding: ${themeToken("spacing-s")};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProductName = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: ${themeToken("palette-text-primary")};
  line-height: 1.3;
`;

const ProductDescription = styled.p`
  margin-top: ${themeToken("spacing-xxs")};
  font-size: 14px;
  color: ${themeToken("palette-text-tertiary-inverted")};
  font-weight: 400;
  margin-bottom: ${themeToken("spacing-s")};
  flex: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ProductRating = styled.span`
  display: flex;
  align-items: center;
  gap: ${themeToken("spacing-xs")};
  font-size: 12px;
  font-weight: 400;
  color: ${themeToken("palette-text-tertiary-inverted")};
  margin-top: auto;
`;

const ProductMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${themeToken("spacing-s")};
  margin-top: ${themeToken("spacing-s")};
  border-top: 1px solid ${themeToken("palette-borders-secondary")};
  padding-top: ${themeToken("spacing-s")};
`;

const ProductImage = styled(SmartImage)`
  height: 246px;
`;

const ProductPrice = styled.span`
  font-size: 24px;
  font-weight: 700;
`;

const AvailabilityBadge = styled.span<{ available: boolean }>`
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  background-color: ${(props) =>
    props.available
      ? themeToken("palette-backgrounds-overlay-accent-10")
      : themeToken("palette-backgrounds-error-weak")};
  color: ${(props) =>
    props.available
      ? themeToken("palette-text-accent")
      : themeToken("palette-text-error-strong")};
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${themeToken("spacing-xs")};
  padding: ${themeToken("spacing-l")};
  padding-inline: ${PAGE_HORIZONTAL_PADDING_PX};
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  min-width: 40px;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid ${themeToken("palette-borders-secondary")};
  background: ${(props) =>
    props.active
      ? themeToken("palette-backgrounds-accent")
      : themeToken("palette-backgrounds-card-alt")};
  color: ${(props) =>
    props.active
      ? themeToken("palette-text-on-accent-strong")
      : themeToken("palette-text-tertiary-inverted")};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${(props) =>
      props.active
        ? themeToken("palette-backgrounds-accent")
        : themeToken("palette-backgrounds-card-alt-hover")};
    border-color: ${themeToken("palette-borders-primary")};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const PaginationEllipsis = styled.span`
  color: ${themeToken("palette-text-tertiary-inverted")};
  padding: 0 8px;
  user-select: none;
`;

const ProductsList: React.FC<{ filters: FilterValues }> = ({
  filters: rawFilters,
}) => {
  const [filters, setFilters] = useState(rawFilters);
  const [cursor, setCursor] = useState<string | undefined>(undefined);

  const { data } = useFilteredProducts({ ...filters, cursor, pageSize: 12 });
  const { products, nextCursor, prevCursor, totalPages, currentPage } = data;

  const debouncedSet = useMemo(
    () =>
      _.debounce((newFilters: FilterValues) => {
        setFilters(newFilters);
        setCursor(undefined);
      }, 200),
    []
  );

  useEffect(() => {
    debouncedSet(rawFilters);
    return () => debouncedSet.cancel();
  }, [rawFilters, debouncedSet]);

  return (
    <>
      <ProductsGrid>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.05,
              layout: { duration: 0.3 },
            }}
          >
            <ProductImage
              src={product.image}
              alt={product.name}
              sizes="(max-width: 500px) 100vw, 500px"
            />
            <ProductContent>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>{product.description}</ProductDescription>
              <ProductRating>
                {Array.from(
                  { length: Math.trunc(product.ratings) },
                  (_, index) => (
                    <StarIcon
                      key={index}
                      className={css`
                        color: ${themeToken("palette-text-rating")};
                      `}
                    />
                  )
                )}
                ({product.ratings})
              </ProductRating>
              <ProductMeta>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>

                <AvailabilityBadge available={product.availability}>
                  {product.availability ? "In Stock" : "Out of Stock"}
                </AvailabilityBadge>
              </ProductMeta>
            </ProductContent>
          </ProductCard>
        ))}
      </ProductsGrid>
      <PaginationContainer>
        <PaginationButton
          disabled={!prevCursor}
          onClick={() => prevCursor && setCursor(prevCursor)}
        >
          Previous
        </PaginationButton>
        <PaginationButton active>{currentPage}</PaginationButton>
        <PaginationEllipsis>/</PaginationEllipsis>
        <PaginationButton>{totalPages}</PaginationButton>
        <PaginationButton
          disabled={!nextCursor}
          onClick={() => nextCursor && setCursor(nextCursor)}
        >
          Next
        </PaginationButton>
      </PaginationContainer>
    </>
  );
};

const ProductsPage = () => {
  const filterForm = useFilters();
  const filterValues = filterForm.watch();
  return (
    <>
      <header
        className={css`
          padding: ${themeToken("spacing-m")} ${PAGE_HORIZONTAL_PADDING_PX};
        `}
      >
        <h1>All Products</h1>
        <p
          className={css`
            margin-block-start: 4px;
            font-size: ${cssFluidClamp(14, 16)};
            font-weight: 400;
            color: ${themeToken("palette-text-tertiary-inverted")};
          `}
        >
          Manage your inventory, pricing, and availability.
        </p>
        <section
          aria-label="Products filters"
          className={css`
            margin-top: ${themeToken("spacing-m")};
            border-radius: 12px;
            border: 1px solid ${themeToken("palette-borders-secondary")};
            background: ${themeToken("palette-backgrounds-overlay-surface-50")};
            padding: ${themeToken("spacing-s")};

            .${themeVariants.light} & {
              background: ${themeToken("palette-backgrounds-card")};
              border: 1px solid ${themeToken("palette-borders-primary")};
            }
          `}
        >
          <Filters {...filterForm} />
        </section>
      </header>
      <main
        className={css`
          border-top: 1px solid ${themeToken("palette-borders-secondary")};
        `}
      >
        <Suspense fallback={<div>Loading products...</div>}>
          <ProductsList filters={filterValues} />
        </Suspense>
      </main>
    </>
  );
};

export default ProductsPage;
