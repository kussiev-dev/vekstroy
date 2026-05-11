const WAREHOUSES = ['Назрань-1', 'Назрань-2', 'Карабулак', 'Магас'] as const

export function useCatalogFilters() {
  const selectedWarehouses = useState<string[]>('catalog-warehouses', () => [])
  const priceMin = useState<number | null>('catalog-price-min', () => null)
  const priceMax = useState<number | null>('catalog-price-max', () => null)

  function toggleWarehouse(name: string) {
    const idx = selectedWarehouses.value.indexOf(name)
    if (idx >= 0) {
      selectedWarehouses.value = selectedWarehouses.value.filter((w) => w !== name)
    } else {
      selectedWarehouses.value = [...selectedWarehouses.value, name]
    }
  }

  function hasWarehouse(name: string) {
    return selectedWarehouses.value.includes(name)
  }

  function filterProducts(products: any[], catalogId: number | null) {
    let result = products || []

    if (catalogId != null) {
      result = result.filter((p) => p.catalogId === catalogId)
    }

    if (selectedWarehouses.value.length > 0) {
      result = result.filter((p) => {
        const stock = p.stock || {}
        return selectedWarehouses.value.some((w) => stock[w] === true)
      })
    }

    if (
      priceMin.value != null &&
      !Number.isNaN(priceMin.value) &&
      priceMin.value > 0
    ) {
      result = result.filter((p) => p.price >= priceMin.value!)
    }

    if (
      priceMax.value != null &&
      !Number.isNaN(priceMax.value) &&
      priceMax.value > 0
    ) {
      result = result.filter((p) => p.price <= priceMax.value!)
    }

    return result
  }

  return {
    WAREHOUSES,
    selectedWarehouses,
    priceMin,
    priceMax,
    toggleWarehouse,
    hasWarehouse,
    filterProducts,
  }
}
