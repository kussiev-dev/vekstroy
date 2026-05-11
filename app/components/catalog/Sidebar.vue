<script setup lang="ts">
const {
  WAREHOUSES,
  priceMin,
  priceMax,
  toggleWarehouse,
  hasWarehouse,
} = useCatalogFilters()
</script>

<template>
  <aside class="catalog-sidebar">
    <div class="catalog-sidebar-section">
      <h4 class="catalog-sidebar-title">Наличие на складах</h4>
      <label
        v-for="warehouse in WAREHOUSES"
        :key="warehouse"
        class="catalog-sidebar-option"
      >
        <input
          type="checkbox"
          class="catalog-sidebar-checkbox-input"
          :checked="hasWarehouse(warehouse)"
          @change="toggleWarehouse(warehouse)"
        />
        <span class="catalog-sidebar-checkbox"></span>
        <span class="catalog-sidebar-option-text">{{ warehouse }}</span>
      </label>
    </div>
    <div class="catalog-sidebar-section">
      <h4 class="catalog-sidebar-title">Цена</h4>
      <div class="catalog-sidebar-price">
        <input
          v-model.number="priceMin"
          type="number"
          placeholder="от"
          class="catalog-sidebar-price-input"
        />
        <input
          v-model.number="priceMax"
          type="number"
          placeholder="до"
          class="catalog-sidebar-price-input"
        />
      </div>
    </div>
  </aside>
</template>

<style scoped lang="scss">
.catalog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;

  &-section {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &-title {
    font-size: 14px;
    margin-bottom: 8px;
  }

  &-option {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
  }

  &-checkbox-input {
    display: none;
  }

  &-checkbox {
    width: 20px;
    height: 20px;
    border-radius: 6px;
    background-color: transparent;
    border: 1px solid #6fb47e;
    position: relative;
    cursor: pointer;
    transition: 0.2s;
  }

  &-option:hover &-checkbox {
    background-color: rgba(111, 180, 126, 0.1);
  }

  &-checkbox::after {
    content: "✓";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -45%);
    font-size: 14px;
    color: #6fb47e;
    opacity: 0;
    transition: 0.2s;
  }

  &-checkbox-input:checked + &-checkbox::after {
    opacity: 1;
  }

  &-checkbox-input:checked + &-checkbox {
    background-color: rgba(111, 180, 126, 0.1);
  }

  &-option-text {
    font-size: 14px;
  }

  &-price {
    display: flex;
    gap: 8px;
  }

  &-price-input {
    width: 100%;
    font-size: 14px;
    padding: 4px 28px 4px 8px;
    border-radius: 6px;
    border: 1px solid #6fb47e;
    background-color: transparent;
    color: #fff;
    appearance: none;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Кастомные стрелки (декоративные) */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='16' viewBox='0 0 10 16'%3E%3Cpath fill='%236fb47e' opacity='0.9' d='M5 2L1 6h8L5 2z'/%3E%3Cpath fill='%236fb47e' opacity='0.9' d='M5 14l4-4H1l4 4z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 6px center;
    background-size: 10px 16px;
  }
}

@media (max-width: 767px) {
	.catalog-sidebar {
		flex-direction: row;
		flex-wrap: wrap;
		gap: 16px;
		padding: 16px;
		border: 2px solid #6fb47e;
		border-radius: 16px;
		background: rgba(111, 180, 126, 0.05);
	}

	.catalog-sidebar-section {
		flex: 1 1 200px;
		min-width: 0;
	}

	.catalog-sidebar-title {
		font-size: 13px;
	}

	.catalog-sidebar-option-text {
		font-size: 13px;
	}
}

@media (max-width: 479px) {
	.catalog-sidebar {
		flex-direction: column;
		gap: 12px;
		padding: 12px;
	}

	.catalog-sidebar-section {
		flex: 1 1 auto;
	}

	.catalog-sidebar-price-input {
		font-size: 16px;
		padding: 8px 32px 8px 10px;
	}
}
</style>
