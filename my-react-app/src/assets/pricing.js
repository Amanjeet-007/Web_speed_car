export const PRICE_MATRIX = {
    "silver wash": {
        Hatchback: 400,
        Sedan: 450,
        "Compact SUV": 550,
        "Full SUV": 600,
        Luxury: 600,
    },
    "gold wash": {
        Hatchback: 500,
        Sedan: 600,
        "Compact SUV": 700,
        "Full SUV": 800,
        Luxury: 800,
    },
    "platinum wash": {
        Hatchback: 1400,
        Sedan: 1600,
        "Compact SUV": 2000,
        "Full SUV": 2200,
        Luxury: 2200,
    },
    "intansive internal cleaning": {
        Hatchback: 1150,
        Sedan: 1350,
        "Compact SUV": 1700,
        "Full SUV": 1800,
        Luxury: 1800,
    },
    "intensive internal cleaning": {
        Hatchback: 1150,
        Sedan: 1350,
        "Compact SUV": 1700,
        "Full SUV": 1800,
        Luxury: 1800,
    },
    "wax rubbing & buffing": {
        Hatchback: 1400,
        Sedan: 1700,
        "Compact SUV": 2000,
        "Full SUV": 2200,
        Luxury: 2200,
    },
    "wax rubbing and buffing": {
        Hatchback: 1400,
        Sedan: 1700,
        "Compact SUV": 2000,
        "Full SUV": 2200,
        Luxury: 2200,
    },
    "teflon coating": {
        Hatchback: 2500,
        Sedan: 2800,
        "Compact SUV": 3200,
        "Full SUV": 3500,
        Luxury: 3500,
    },
};

function normalizeTitle(title) {
    return title.trim().toLowerCase();
}

export function getPriceBreakdown(serviceTitle, category) {
    if (!serviceTitle || !category) return null;

    const key = normalizeTitle(serviceTitle);
    const row = PRICE_MATRIX[key];
    if (!row) return null;

    const basePrice = row.Hatchback;
    const categoryPrice = row[category];
    if (categoryPrice === undefined) return null;

    const surcharge = categoryPrice - basePrice;

    return {
        serviceTitle,
        category,
        basePrice,
        categoryPrice,
        surcharge,
        surchargeLabel:
            surcharge === 0
                ? "Standard pricing"
                : `+₹${surcharge} for ${category} (larger size / more surface area)`,
    };
}