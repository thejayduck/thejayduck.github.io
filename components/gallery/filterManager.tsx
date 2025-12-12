import { useMemo, useState } from "react";
import IGalleryEntry from "./IGalleryEntry";
import { getIcon } from "@/lib/helper";

export interface FilterProps {
  key: string;
  title: string;
  alt?: string;
  /** Icon beside the button.  */
  icon?: string;
  /** Enable search. Applies to dropdown only.  */
  search?: boolean;

  disableUnmatched?: boolean; // implemented but practically not used for anything
  /** Choose type of UI implementation. Outside of "normal" tags, everything else uses dropdown (year, descriptive tags)  */
  type: "dropdown" | "list"; // ? Change to boolean ?
  /** Allows multiple option selection. Only applies to dropdown UI. */
  multiSelect: boolean;
  /** Get the specified tag value from the provided Gallery Entry. */
  getValue: (value: IGalleryEntry) => string | string[];
  /** Get all tags from all elements from the specified property in the database */
  getOptions: (data: IGalleryEntry[]) => string[];
}

//? Move to helper.tsx ?
// Tag renaming and icons
export const TAG_METADATA: Record<string, [string, string]> = {
  animation: ["Animation", "ri-film-fill"],
  animal: ["Animal", "ri-leaf-fill"],
  cg: ["CG", "ri-computer-fill"],
  characterdesign: ["Character Design", "ri-compasses-2-fill"],
  commission: ["Commission", "ri-shake-hands-fill"],
  fanart: ["Fan Art", "ri-heart-fill"],
  fullcolor: ["Full Color", "ri-rainbow-fill"],
  gamejam: ["Game Jam", "ri-gamepad-fill"],
  lineart: ["Line Art", "ri-draft-fill"],
  sensitive: ["Sensitive", "ri-eye-off-fill"],
  oc: ["Original Character", "ri-user-fill"],
  sketch: ["Sketch", "ri-sketching"],
};

// TODO implement descriptive tag grouping
// ? Also implement renaming inside tags ?
export const DESCRIPTIVE_TAG_GROUPS: Record<
  string, // group type
  { name: string; tags: string[] } // Group title and matching tags
> = {
  pose: {
    name: "Pose",
    tags: ["standing", "sitting", "lying"],
  },
  crop: {
    name: "Crop",
    tags: ["full_body", "knee_up", "waist_up", "chest_up", "portrait"],
  },
  angle: {
    name: "Angle",
    tags: ["from_above", "from_below"],
  },
  hair: {
    name: "Hair Length",
    tags: ["short_hair", "medium_hair", "long_hair"],
  },
};

const FILTERS: FilterProps[] = [
  {
    // Year
    key: "year",
    title: "Year",
    alt: "Filter by year",
    icon: getIcon("createdDate"),
    type: "dropdown",
    disableUnmatched: true,
    multiSelect: false,
    getValue: (value) => value.date?.split("-")[0],
    getOptions: (data) =>
      Array.from(new Set(data.map((i) => i.date?.split("-")[0])))
        .sort()
        .reverse(),
  },
  {
    // Descriptive Tags, things like pose, perspective, hair, etc.
    key: "descTags",
    title: "Details",
    alt: "Filter by details (Experimental)",
    search: true,
    icon: "ri-file-info-fill",
    type: "dropdown",
    disableUnmatched: true,
    multiSelect: true,
    getValue: (value) => value.descriptiveTags ?? [],
    getOptions: (data) =>
      Array.from(new Set(data.flatMap((i) => i.descriptiveTags ?? []))).sort(),
  },
  {
    // Content type tags
    key: "tags",
    title: "Tags",
    type: "list",
    multiSelect: true,
    getValue: (value) =>
      [...(value.tags ?? []), value.sensitive ? "sensitive" : null].filter(
        (t) => typeof t == "string"
      ) as string[],
    getOptions: (data) =>
      Array.from(
        new Set(
          data.flatMap((i) =>
            [...i.tags, i.sensitive ? "sensitive" : null].filter(
              (tag) => typeof tag == "string"
            )
          )
        )
      ).sort(),
  },
];

export function GalleryFilters(
  galleryData: IGalleryEntry[],
  sortOrder: string
) {
  // Key is used for the type of tag added to the pool of tags, specified above
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({}); // ? try to change the type to string[]

  const filteredGallery = useMemo(() => {
    let result = galleryData.filter((item) => {
      return FILTERS.every((filter) => {
        const activeValues = activeFilters[filter.key] || [];
        if (activeValues.length == 0) return true;

        const value = filter.getValue(item);

        if (filter.multiSelect) {
          return activeValues.every((val: string) => value.includes(val));
        } else {
          return [value].some((val) => activeValues.includes(val));
        }
      });
    });

    return sortOrder == "recent" ? result : result.reverse();
  }, [galleryData, activeFilters, sortOrder]);

  // Available by currently active gallery list
  const getAvailableFilters = useMemo(() => {
    const result: Record<string, Set<string>> = {};
    FILTERS.forEach((filter) => {
      result[filter.key] = new Set(filteredGallery.flatMap(filter.getValue));
    });

    // console.log(result);

    return result;
  }, [filteredGallery]);

  const applyFilter = (key: string, value: string, multiSelect: boolean) => {
    setActiveFilters((prev) => {
      const current = prev[key] || [];
      if (!multiSelect) return { ...prev, [key]: [value] };

      return {
        ...prev,
        [key]: current.includes(value)
          ? current.filter((v: string) => v != value)
          : [...current, value],
      };
    });
  };

  const clearFilterByKey = (key: string) => {
    setActiveFilters((prev) => ({ ...prev, [key]: [] }));
  };

  const clearAllFilters = () => setActiveFilters({});

  return {
    filteredGallery,
    getAvailableFilters,
    clearAllFilters,
    clearFilterByKey,
    activeFilters,
    applyFilter,
    configs: FILTERS,
  };
}
