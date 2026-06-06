# **Little Book Club Illustration Asset Implementation Guide**

## **Purpose**

This document defines how approved illustration assets should be implemented within the Little Book Club website.

The illustrations have already been approved.

They represent the visual language of the brand and must not be redesigned, restyled, simplified or replaced.

The only purpose of this document is to determine:

* Asset formats  
* Optimisation approach  
* File structure  
* Responsive implementation  
* Whether assets remain PNG/WebP or are recreated as SVG

---

# **Critical Rule**

## **Do Not Redesign Anything**

All supplied illustrations are considered approved master assets.

Cursor should:

* Preserve colours  
* Preserve line weights  
* Preserve proportions  
* Preserve composition  
* Preserve character design  
* Preserve decorative elements  
* Preserve expressions  
* Preserve spacing

No visual reinterpretation is permitted.

---

# **Approved Illustration Style**

The following characteristics define the Little Book Club illustration system.

## **Line Work**

* Thick dark brown outlines  
* Rounded line endings  
* Consistent stroke width

## **Colour Palette**

Primary:

* Warm Orange  
* Sage Green  
* Dusty Blue

Secondary:

* Warm Brown  
* Cream

## **Character Style**

* Friendly  
* Rounded  
* Child-focused  
* Slightly stylised  
* Soft facial features

## **Decorative Elements**

Used sparingly:

* Stars  
* Leaves  
* Story trails  
* Clouds  
* Small adventure motifs

## **General Feel**

* Premium  
* Friendly  
* Educational  
* Warm  
* Family-focused

---

# **Asset Categories**

Assets fall into three groups:

## **Category A**

Hero Illustrations

Examples:

* Boy Reading Book  
* Girl Reading Book  
* Mixed Reading Scenes  
* Mixed Reading Scenes 2

These are large feature illustrations.

---

## **Category B**

Mini Illustrations

Examples:

* Bundle Icons  
* Marketing Content Themes  
* Design General Elements

These are branded illustration assets.

---

## **Category C**

Functional Site Icons

Examples:

* Bundle Builder Options  
* Trust & Authority Icons

These behave more like interface elements.

---

# **File Format Rules**

## **Category A**

Hero Illustrations

Keep as:

### **WebP**

Preferred

Fallback:

### **PNG**

Do NOT recreate as SVG.

Reason:

* Complex artwork  
* Multiple shapes  
* Character illustrations  
* SVG size would be larger  
* Difficult to maintain

---

## **Category B**

Mini Illustrations

Keep as:

### **WebP**

Preferred

Fallback:

### **PNG**

Do NOT convert to SVG.

Reason:

These are still illustrations rather than icons.

Examples:

* Rocket with books  
* Dinosaur with books  
* Princess with books  
* Books on beach  
* Reading Adventure  
* Family Library

These should remain image assets.

---

## **Category C**

Functional Site Icons

Recreate as SVG.

These are simple enough to benefit from SVG.

SVG versions should be manually recreated.

Never auto-traced.

Never converted from PNG.

---

# **SVG Recreation Rules**

For Category C assets only.

SVG versions must preserve:

* Colour palette  
* Stroke colour  
* Stroke weight  
* Corner radius  
* Overall silhouette

Simplify only where required.

The visual result should feel identical.

---

# **SVG Technical Standards**

Use:

```
stroke-linecap="round"
stroke-linejoin="round"
```

Maintain:

* Rounded corners  
* Rounded ends  
* Consistent outline thickness

Avoid:

* Tiny details  
* Excessive nodes  
* Filters  
* Effects

Target:

Under 10KB per icon.

---

# **Asset Splitting Rules**

Several supplied PNGs contain multiple illustrations.

These should be separated into individual assets.

---

# **File Naming Convention**

Use:

```
kebab-case
```

Examples:

```
boy-reading-book.webp
girl-reading-book.webp

little-discovery.webp
reading-adventure.webp
family-library.webp

age-range.svg
reading-level.svg
quality-checked.svg
```

---

# **Asset Breakdown**

---

## **Site General \- Boy Reading Book.png**

Type:

Hero Illustration

Action:

Keep as illustration

Export:

```
boy-reading-book.webp
```

Format:

WebP

No SVG.

---

## **Site General \- Girl Reading Book.png**

Type:

Hero Illustration

Action:

Keep as illustration

Export:

```
girl-reading-book.webp
```

Format:

WebP

No SVG.

---

## **Site General \- Mixed Reading Scenes.png**

Contains:

* Reading Outside  
* Reading Under Tree  
* Reading In Bedroom

Split into:

```
reading-outside.webp
reading-under-tree.webp
reading-bedroom.webp
```

Format:

WebP

No SVG.

---

## **Site General \- Mixed Reading Scenes 2.png**

Contains:

* Reading In Teepee  
* Reading In Library  
* Reading In Toy Room

Split into:

```
reading-teepee.webp
reading-library.webp
reading-toy-room.webp
```

Format:

WebP

No SVG.

---

## **Site \- Bundle Icons.png**

Contains:

* Little Discovery  
* Reading Adventure  
* Family Library

Split into:

```
little-discovery.webp
reading-adventure.webp
family-library.webp
```

Format:

WebP

No SVG.

These are illustrations.

---

## **Design General \- Various Design Elements.png**

Contains:

* Rocket With Books  
* Dinosaurs With Books  
* Toys With Books  
* Princess With Books  
* Books In Pile  
* Books On Shelves  
* Books In Travel Bag  
* Books In Forest  
* Books On Beach  
* Book Open With Ideas

Split into:

```
rocket-books.webp
dinosaur-books.webp
toys-books.webp
princess-books.webp
books-pile.webp
books-shelves.webp
books-travel-bag.webp
books-forest.webp
books-beach.webp
book-ideas.webp
```

Format:

WebP

No SVG.

---

## **Marketing General \- Content Themes.png**

Contains:

* Reading Tips  
* Parent Advice  
* Book Recommendations  
* Activity Ideas

Split into:

```
reading-tips.webp
parent-advice.webp
book-recommendations.webp
activity-ideas.webp
```

Format:

WebP

No SVG.

These are branded mini illustrations.

---

## **Site Bundle Builder \- Options Icons.png**

Contains:

* Age Range  
* Interests  
* Reading Level  
* Bundle Selection  
* Cart  
* Checkout  
* Payment  
* Order Complete

Split into:

```
age-range.svg
interests.svg
reading-level.svg
bundle-selection.svg
cart.svg
checkout.svg
payment.svg
order-complete.svg
```

Format:

SVG

These are UI icons.

Manually recreate.

Do not auto-convert.

---

## **Site General \- Badges and Authority.png**

Contains:

* Curated Selection  
* Quality Checked  
* Pre-Loved Books  
* Affordable Reading  
* Eco Friendly  
* Delivered Across Thailand  
* Encourages Reading  
* Build A Home Library

Split into:

```
curated-selection.svg
quality-checked.svg
pre-loved-books.svg
affordable-reading.svg
eco-friendly.svg
delivered-thailand.svg
encourages-reading.svg
home-library.svg
```

Format:

SVG

Manually recreate.

Do not auto-convert.

---

# **Final Asset Strategy**

| Category | Format |
| ----- | ----- |
| Hero Illustrations | WebP |
| Reading Scene Illustrations | WebP |
| Bundle Illustrations | WebP |
| Decorative Illustration Elements | WebP |
| Marketing Theme Illustrations | WebP |
| Bundle Builder Icons | SVG |
| Trust Icons | SVG |

This approach preserves 100% of the approved visual style while giving you the performance benefits of SVG only where SVG genuinely makes sense.

