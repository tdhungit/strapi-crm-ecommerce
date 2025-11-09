'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import ApiService from '@/service/ApiService';
import { useEffect, useState } from 'react';
import { SearchProductType } from '../interface';

export default function SearchProductsParams({
  onChange,
}: {
  onChange?: (params: SearchProductType) => void;
}) {
  const [categories, setCategories] = useState<any[]>([]);
  const [brands, setBrands] = useState<any[]>([]);
  const [init, setInit] = useState(false);
  const [params, setParams] = useState<SearchProductType>({
    price: [0, 10000],
    category: [],
    brand: [],
  });

  const fetchCategories = () => {
    ApiService.request('GET', '/product-categories', {
      filters: {
        parent: null,
      },
      pagination: {
        page: 1,
        pageSize: 100,
      },
      sort: {
        name: 'asc',
      },
    })
      .then((res: any) => {
        setCategories(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchBrands = () => {
    ApiService.request('GET', '/brands', {
      pagination: {
        page: 1,
        pageSize: 100,
      },
      sort: {
        name: 'asc',
      },
    })
      .then((res: any) => {
        setBrands(res.data || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setParams((prev: SearchProductType) => ({
      ...prev,
      category: checked
        ? [...(prev.category || []), parseInt(categoryId)]
        : (prev.category || []).filter(
            (id: number) => id !== parseInt(categoryId)
          ),
    }));
  };

  const handleBrandChange = (brandId: string, checked: boolean) => {
    setParams((prev: SearchProductType) => ({
      ...prev,
      brand: checked
        ? [...(prev.brand || []), parseInt(brandId)]
        : (prev.brand || []).filter((id: number) => id !== parseInt(brandId)),
    }));
  };

  useEffect(() => {
    setInit(true);
    fetchCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (!init) return;
    onChange?.(params);
  }, [params]);

  return (
    <div className='space-y-2 p-4 border-r bg-white rounded-md'>
      <h3 className='text-xl font-semibold'>Filters</h3>

      {/* Price Range */}
      <div className='space-y-3'>
        <h4 className='font-medium text-sm'>Price Range</h4>
        <div className='space-y-4'>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={params.price || []}
            onValueChange={(value) =>
              setParams((prev) => ({ ...prev, price: value }))
            }
            className='w-full'
          />
          <div className='flex items-center justify-between text-sm text-muted-foreground'>
            <span>${params.price?.[0]}</span>
            <span>${params.price?.[1]}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Categories */}
      <div className='space-y-3'>
        <h4 className='font-medium text-sm'>Categories</h4>
        <ScrollArea className='h-[200px]'>
          <div className='space-y-2'>
            {categories.map((category) => (
              <div key={category.id} className='flex items-center space-x-2'>
                <Checkbox
                  id={`category-${category.id}`}
                  checked={params.category?.includes(parseInt(category.id))}
                  onCheckedChange={(checked) =>
                    handleCategoryChange(category.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`category-${category.id}`}
                  className='text-sm font-normal cursor-pointer'
                >
                  {category.name}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      {/* Brands */}
      <div className='space-y-3'>
        <h4 className='font-medium text-sm'>Brands</h4>
        <ScrollArea className='h-[200px]'>
          <div className='space-y-2'>
            {brands.map((brand) => (
              <div key={brand.id} className='flex items-center space-x-2'>
                <Checkbox
                  id={`brand-${brand.id}`}
                  checked={params.brand?.includes(parseInt(brand.id))}
                  onCheckedChange={(checked) =>
                    handleBrandChange(brand.id, checked as boolean)
                  }
                />
                <Label
                  htmlFor={`brand-${brand.id}`}
                  className='text-sm font-normal cursor-pointer'
                >
                  {brand.name}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
