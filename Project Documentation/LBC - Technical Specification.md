# **Little Book Club — Technical Specification**

## **1\. Project Purpose**

Build a fast, SEO-friendly, modern website for **Little Book Club**, a Thailand-based direct-to-consumer business selling curated bundles of quality pre-loved English-language children’s books for ages 0–12.

This technical spec accompanies separate brand, website copy, homepage structure, order flow and business strategy documents.

The launch version should be deliberately simple, easy to maintain, and quick to build.

## **2\. Core Technical Direction**

Use:

* **Next.js App Router**  
* **TypeScript**  
* **Tailwind CSS**  
* **Supabase**  
* **Stripe Checkout**  
* **Mailchimp Marketing API**

Next.js App Router is the preferred routing system and supports modern React features including Server Components, Suspense and Server Functions. The project should be static-first where possible for performance and SEO.

## **3\. Primary Goals**

The website must:

* Load very quickly  
* Be good for SEO  
* Be easy for Claude/Cursor to generate and maintain  
* Look modern, warm and not dated  
* Use reusable components  
* Support simple guest checkout  
* Store customers and orders in Supabase  
* Take payment using Stripe Checkout  
* Add marketing subscribers and customers to Mailchimp with correct tags  
* Avoid unnecessary complexity at launch

## **4\. Launch Scope**

### **Included at Launch**

* Homepage  
* About page  
* How it works / order flow content  
* Bundle selection  
* Checkout/order form  
* Stripe Checkout payment  
* Order confirmation page  
* FAQ section/page  
* Newsletter signup  
* Mailchimp customer/newsletter tagging  
* Supabase database for customers and orders  
* Basic admin through Supabase dashboard

### **Not Required at Launch**

* Customer account area  
* Saved payment methods  
* Subscription logic  
* Custom admin dashboard  
* Individual book inventory  
* Individual title purchasing  
* Complex delivery integrations  
* Advanced recommendation engine  
* Reviews system

Customer accounts can be added later using Supabase Auth.

## **5\. Recommended Folder Structure**

```
/app
  /(site)
    page.tsx
    about/page.tsx
    how-it-works/page.tsx
    faqs/page.tsx
    checkout/page.tsx
    order-success/page.tsx
    order-cancelled/page.tsx
  /api
    /checkout/create-session/route.ts
    /stripe/webhook/route.ts
    /mailchimp/subscribe/route.ts
/components
  /layout
    Header.tsx
    Footer.tsx
    MobileNav.tsx
  /sections
    Hero.tsx
    BundleIntro.tsx
    HowItWorks.tsx
    WhyPreLoved.tsx
    ParentBenefits.tsx
    TestimonialsPlaceholder.tsx
    FAQAccordion.tsx
    NewsletterSignup.tsx
  /checkout
    BundleSelector.tsx
    CheckoutForm.tsx
    MarketingOptInCheckbox.tsx
    OrderSummary.tsx
  /ui
    Button.tsx
    Card.tsx
    Badge.tsx
    Input.tsx
    Select.tsx
    Textarea.tsx
    Checkbox.tsx
/lib
  supabaseClient.ts
  supabaseAdmin.ts
  stripe.ts
  mailchimp.ts
  validation.ts
  constants.ts
  pricing.ts
/types
  database.ts
  order.ts
  customer.ts
/styles
  globals.css
```

## **6\. Design System Notes**

Use the separate branding document as the source of truth.

Confirmed brand direction:

* Warm orange as primary brand colour  
* Use colour sparingly  
* Illustrations and icons preferred over photos  
* Warm, friendly, trustworthy tone  
* No Comic Sans  
* Headings: Baloo 2  
* Body text: Nunito  
* Clean, friendly layout  
* Soft rounded cards  
* Generous spacing  
* Modern but not over-designed

Use Tailwind utility classes and reusable components.

Avoid:

* Heavy animations  
* Dark, corporate styling  
* Overly childish styling  
* Stock-photo-heavy layouts  
* Complicated UI patterns  
* Large JS bundles where avoidable

## **7\. SEO Requirements**

Each public page should include:

* Unique page title  
* Meta description  
* Open Graph title and description  
* Canonical URL  
* Semantic HTML  
* Clear H1  
* Logical H2/H3 structure

Next.js Metadata APIs should be used for SEO and share metadata.

Recommended SEO pages:

* `/`  
* `/about`  
* `/how-it-works`  
* `/faqs`  
* `/checkout`

The homepage should target themes such as:

* Pre-loved English children’s books Thailand  
* Affordable English books for children  
* Children’s book bundles Thailand  
* Build a home library for children

## **8\. Supabase Requirements**

Use Supabase for:

* Customers  
* Orders  
* Order items / selected bundle  
* Marketing consent status  
* Payment status  
* Delivery details  
* Admin notes  
* Optional future auth

Supabase Row Level Security should be enabled from day one. RLS provides database-level access control and integrates with Supabase Auth if accounts are added later.

### **Suggested Tables**

#### **`customers`**

```sql
id uuid primary key default gen_random_uuid(),
email text not null,
first_name text,
last_name text,
phone text,
created_at timestamptz default now(),
updated_at timestamptz default now()
```

#### **`orders`**

```sql
id uuid primary key default gen_random_uuid(),
customer_id uuid references customers(id),
email text not null,
first_name text not null,
last_name text,
phone text,
delivery_address_line_1 text not null,
delivery_address_line_2 text,
city text not null,
province text,
postcode text,
country text default 'Thailand',
bundle_type text not null,
child_age_range text,
reading_level text,
preferences text,
avoid_topics text,
gift_message text,
marketing_opt_in boolean default false,
order_status text default 'draft',
payment_status text default 'pending',
stripe_checkout_session_id text,
stripe_payment_intent_id text,
total_amount integer not null,
currency text default 'THB',
source text default 'website',
admin_notes text,
created_at timestamptz default now(),
updated_at timestamptz default now()
```

#### **`mailchimp_sync_log`**

```sql
id uuid primary key default gen_random_uuid(),
email text not null,
event_type text not null,
tags text[],
status text not null,
error_message text,
created_at timestamptz default now()
```

## **9\. Order Statuses**

Use simple statuses:

```
draft
awaiting_payment
paid
packing
fulfilled
cancelled
refunded
```

## **10\. Payment Statuses**

Use:

```
pending
paid
failed
refunded
```

The order should only become `paid` after a verified Stripe webhook confirms payment.

## **11\. Stripe Payment Flow**

Use **Stripe Checkout**, not custom card forms.

Stripe Checkout keeps the payment flow simpler, faster to build and easier to maintain. Stripe webhooks should be used to confirm payment events server-side.

### **Flow**

1. Customer completes checkout form on website.  
2. Website creates a draft order in Supabase.  
3. Website calls `/api/checkout/create-session`.  
4. Server creates a Stripe Checkout Session.  
5. Customer pays through Stripe-hosted checkout.  
6. Stripe redirects to success or cancelled page.  
7. Stripe webhook confirms payment.  
8. Supabase order is updated to:  
   * `order_status = paid`  
   * `payment_status = paid`  
9. Customer is added/updated in Mailchimp according to consent rules.

### **Stripe Webhook Events**

Handle at minimum:

```
checkout.session.completed
payment_intent.payment_failed
charge.refunded
```

The most important launch event is `checkout.session.completed`.

## **12\. Mailchimp Requirements**

Use Mailchimp for:

* Newsletter subscribers  
* Customer tagging  
* Marketing opt-in tracking  
* Future segmentation

Mailchimp supports organizing contacts with tags through the Marketing API.

### **Required Tags**

```
newsletter
customer
marketing-opt-in
website
checkout
school-fair
```

### **Newsletter Signup Rules**

If someone signs up through the newsletter form:

* Add/update Mailchimp contact  
* Subscribe them to marketing  
* Add tags:  
  * `newsletter`  
  * `website`

### **Checkout Rules**

Checkout must include this checkbox:

Yes, please send me reading tips, activity ideas, special offers and Little Book Club updates.

Checkbox default: **unchecked**.

If checkout customer ticks the box:

* Add/update Mailchimp contact  
* Subscribe them to marketing  
* Add tags:  
  * `customer`  
  * `checkout`  
  * `marketing-opt-in`

If checkout customer does not tick the box:

* Store customer/order in Supabase  
* Do not subscribe them to marketing emails  
* Add/sync customer record only if legally and technically appropriate  
* They may still receive transactional order/payment emails

### **Important Consent Rule**

Marketing emails only go to users who actively opt in.

Transactional emails such as order confirmation, payment receipt and delivery updates can still be sent regardless of marketing consent.

Mailchimp member tags can be added or removed through the member tags API.

## **13\. Checkout Form Fields**

Required fields:

* First name  
* Email  
* Phone  
* Delivery address line 1  
* City  
* Province  
* Postcode if relevant  
* Bundle type  
* Child age range  
* Reading level or confidence level  
* Marketing opt-in checkbox

Optional fields:

* Child interests  
* Topics to avoid  
* Gift message  
* Delivery notes

## **14\. Bundle Selection**

The exact product/pricing structure should come from the content/business document.

Technically, bundles should be defined in a central config file at launch:

```ts
export const bundles = [
  {
    id: "starter",
    name: "Starter Bundle",
    price: 0000,
    currency: "THB",
    description: "..."
  }
]
```

Do not hard-code prices across many components.

## **15\. Environment Variables**

Required:

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
MAILCHIMP_API_KEY=
MAILCHIMP_SERVER_PREFIX=
MAILCHIMP_AUDIENCE_ID=
```

Never expose:

* Supabase service role key  
* Stripe secret key  
* Stripe webhook secret  
* Mailchimp API key

## **16\. API Routes**

### **`/api/checkout/create-session`**

Responsibilities:

* Validate form data  
* Create/update customer in Supabase  
* Create draft order in Supabase  
* Create Stripe Checkout Session  
* Include order ID in Stripe metadata  
* Return Stripe Checkout URL

### **`/api/stripe/webhook`**

Responsibilities:

* Verify Stripe webhook signature  
* Read order ID from metadata  
* Update Supabase order status  
* Update payment status  
* Trigger Mailchimp sync if required  
* Log any failures

### **`/api/mailchimp/subscribe`**

Responsibilities:

* Validate email  
* Add/update Mailchimp contact  
* Apply tags  
* Store signup source  
* Return success/error response

## **17\. Validation**

Use a schema validation library such as Zod.

Validate:

* Email format  
* Required fields  
* Phone present  
* Bundle ID exists  
* Marketing opt-in is boolean  
* Total price is calculated server-side, not trusted from client

## **18\. Security Requirements**

* Use server-side Stripe session creation  
* Use Stripe webhook signature verification  
* Use Supabase RLS  
* Use service role key only server-side  
* Do not trust client-side price values  
* Sanitize free-text fields  
* Avoid logging sensitive personal data  
* Keep admin-only operations server-side  
* Use environment variables for secrets

## **19\. Performance Requirements**

* Use static rendering where possible  
* Keep homepage lightweight  
* Avoid unnecessary client components  
* Use Server Components by default  
* Use client components only for interactive form sections  
* Optimize fonts  
* Use SVG icons/illustrations where possible  
* Avoid large image assets at launch  
* Use lazy loading for non-critical sections

## **20\. Accessibility Requirements**

* Proper labels for all form fields  
* Keyboard-accessible navigation  
* Visible focus states  
* Sufficient colour contrast  
* Semantic headings  
* Buttons must be buttons, not clickable divs  
* Form errors must be clear and readable  
* Newsletter and checkout consent must be explicit

## **21\. Analytics**

Launch can be simple.

Recommended:

* Add Google Analytics or Plausible later if desired  
* Track key events only:  
  * newsletter signup  
  * checkout started  
  * payment completed  
  * order cancelled  
  * FAQ interaction if useful

Do not block launch on advanced analytics.

## **22\. Admin Approach**

At launch, use Supabase dashboard for admin.

Admin needs to see:

* New orders  
* Paid orders  
* Customer details  
* Bundle selected  
* Child age range  
* Preferences  
* Delivery address  
* Payment status  
* Marketing consent  
* Admin notes

Future custom admin can include:

* Packing list  
* Fulfilment status  
* Customer history  
* School fair source tracking  
* Manual order creation

## **23\. Future Features to Leave Room For**

Do not build these yet, but structure the project so they can be added:

* Customer accounts  
* Repeat order history  
* Subscriptions  
* Gift bundles  
* Referral codes  
* School fair landing pages  
* Discount codes  
* Custom admin dashboard  
* Delivery status emails  
* Reading tips content hub  
* Blog/articles  
* Parent activity library

## **24\. Build Priorities**

### **Priority 1**

* Project setup  
* Layout  
* Homepage  
* Core pages  
* Brand styling  
* Basic reusable components

### **Priority 2**

* Checkout form  
* Supabase order creation  
* Stripe Checkout  
* Stripe webhook

### **Priority 3**

* Mailchimp newsletter signup  
* Checkout marketing opt-in  
* Mailchimp tagging

### **Priority 4**

* Final SEO  
* Accessibility pass  
* Performance pass  
* Testing  
* Deployment

## **25\. Acceptance Criteria**

The website is ready for launch when:

* Homepage loads quickly  
* All main content pages work  
* Checkout form validates correctly  
* Stripe Checkout works in test mode  
* Stripe webhook updates Supabase orders  
* Paid orders appear correctly in Supabase  
* Newsletter signup adds correct Mailchimp tags  
* Checkout marketing opt-in adds correct Mailchimp tags  
* Customers who do not opt in are not subscribed to marketing  
* Mobile layout works well  
* SEO metadata exists on all public pages  
* No secret keys are exposed client-side  
* No customer account is required to order

## **26\. Final Instruction to Claude/Cursor**

Build the simplest robust launch version.

Do not over-engineer.

Prioritise:

* Speed  
* Clarity  
* SEO  
* Warm brand execution  
* Simple checkout  
* Reliable payment confirmation  
* Clean Supabase data  
* Correct Mailchimp consent and tagging

The customer should be able to understand the offer, choose a bundle, place an order, pay securely and optionally join the Little Book Club mailing list.

# **Technical Addendum — Customer Book History**

## **Purpose**

Little Book Club needs to store a record of books each customer has previously received.

The purpose is to avoid sending duplicate books to the same customer in future orders.

This does not need a custom frontend at launch. The data can initially be managed through the Supabase UI.

## **Launch Scope**

At launch, build the backend structure only.

Included:

* Store individual books previously received by a customer  
* Link received books to the customer table  
* Optionally link received books to the order table  
* Store title, author and date received  
* Allow admin/manual entry through Supabase dashboard

Not required at launch:

* Custom frontend  
* Customer-facing book history  
* Barcode scanning  
* ISBN lookup  
* Inventory management  
* Duplicate prevention automation  
* Recommendations engine

## **Recommended Database Design**

Create a new table called:

```
customer_received_books
```

This table should link to the existing `customers` table.

It may also optionally link to the `orders` table so we know which order the book was sent in.

## **Table: `customer_received_books`**

```sql
create table customer_received_books (
  id uuid primary key default gen_random_uuid(),

  customer_id uuid not null references customers(id) on delete cascade,
  order_id uuid references orders(id) on delete set null,

  title text not null,
  author text,
  isbn text,

  received_date date not null default current_date,

  condition_notes text,
  admin_notes text,

  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

## **Field Notes**

### **`customer_id`**

Required.

Links the book history record to the customer.

### **`order_id`**

Optional but recommended.

Allows Little Book Club to see which order the book was included in.

### **`title`**

Required.

The main book title.

### **`author`**

Optional but strongly recommended.

Used to distinguish similar titles.

### **`isbn`**

Optional for launch.

Useful later if barcode scanning or ISBN lookup is added.

### **`received_date`**

Required.

The date the customer received the book.

Defaults to the current date.

### **`condition_notes`**

Optional.

Can be used for notes such as:

* good condition  
* very good condition  
* minor cover wear  
* library copy  
* board book  
* paperback

### **`admin_notes`**

Optional.

Internal notes only.

## **Indexes**

Add indexes for quick lookup by customer, title and ISBN.

```sql
create index customer_received_books_customer_id_idx
on customer_received_books(customer_id);

create index customer_received_books_title_idx
on customer_received_books(title);

create index customer_received_books_isbn_idx
on customer_received_books(isbn);
```

## **Duplicate Checking**

At launch, duplicate checking can be manual using the Supabase dashboard.

Before packing a new order, admin can search the customer’s previous received books and avoid selecting the same title again.

Future automation can compare selected packing list items against this table.

## **Future Frontend Possibilities**

In a future admin interface, Little Book Club may add:

* Customer book history view  
* Add received books from order fulfilment screen  
* Barcode scanning  
* ISBN lookup  
* Automatic duplicate warning  
* Suggested replacement book  
* CSV import/export  
* Bulk upload from packing lists

## **Future Barcode Scanning Support**

The `isbn` field has been included now so the database is ready for future barcode scanning.

Future scanning flow could be:

1. Admin opens order packing screen.  
2. Admin scans book barcode.  
3. System extracts ISBN.  
4. System checks whether customer has already received that ISBN or matching title.  
5. System warns admin if duplicate found.  
6. If approved, book is added to customer history.

Do not build this at launch.

## **Data Entry at Launch**

For launch, use the Supabase UI.

Suggested manual process:

1. Customer places an order.  
2. Order is paid and marked ready for packing.  
3. Admin chooses books for the bundle.  
4. Admin adds each selected book to `customer_received_books`.  
5. Admin links each book to the customer.  
6. Admin optionally links each book to the order.  
7. Admin marks the order as packed or fulfilled.

## **Row Level Security**

Enable Row Level Security on this table.

For launch, only service-role/admin access is required.

Customers should not be able to view or edit this table unless a future customer account feature explicitly supports it.

## **Acceptance Criteria**

This addendum is complete when:

* `customer_received_books` table exists  
* Each record links to a customer  
* Each record can optionally link to an order  
* Title can be stored  
* Author can be stored  
* ISBN can be stored for future scanning  
* Received date can be stored  
* Admin can search previous books in Supabase  
* Backend supports future duplicate prevention  
* No custom frontend is required at launch

## **Final Instruction to Claude/Cursor**

Build only the backend support for customer book history at launch.

Keep the structure simple, but future-friendly.

The key requirement is that Little Book Club can record which books each customer has already received so repeat customers do not accidentally receive the same book again.

# **Technical Addendum: Reading Stage Classification Update**

## **Purpose**

Replace the existing "Reading Level" terminology with a more customer-friendly "Reading Stage" model.

This simplifies the customer experience, improves bundle matching accuracy, and aligns the operational workflow with how inventory will be physically organised.

Reading Stage becomes the primary curation factor.

Age Range becomes a secondary factor used to ensure content is age-appropriate.

Interests remain a personalisation factor.

---

# **Customer Profile Data Structure**

## **Child Profile Fields**

### **Age Range**

Required

Options:

* 0–2  
* 3–5  
* 6–8  
* 9–12

Purpose:

* Content suitability  
* Theme maturity  
* Final curation validation

Age Range should not be treated as the primary book selection criterion.

---

### **Reading Stage**

Required

Options:

#### **Board Books**

Description:

Mostly pictures and very few words.

#### **Picture Books**

Description:

Stories typically read together with a parent or caregiver.

#### **Early Readers**

Description:

Simple books a child can read independently.

#### **Independent Readers**

Description:

Longer books with fewer pictures and more text.

#### **Chapter Books**

Description:

Full stories divided into chapters.

Purpose:

* Primary curation input  
* Primary inventory organisation method  
* Primary bundle matching criterion

---

### **Interests**

Required

Multi-select

Allow selection of up to 5 interests.

Initial options:

* Animals  
* Dinosaurs  
* Adventure  
* Science  
* Space  
* Nature  
* Magic & Fantasy  
* Vehicles  
* Sport  
* Princesses & Fairies  
* History  
* Mystery

Purpose:

* Personalisation only  
* Not used for inventory organisation

---

# **Checkout Flow Updates**

## **Replace Existing Reading Level Question**

Remove any wording that references:

"Reading Level"

Replace with:

### **What books does your child currently enjoy?**

Helper text:

Choose the option that best matches the books your child enjoys reading today.

Display as visual cards.

Cards:

* Board Books  
* Picture Books  
* Early Readers  
* Independent Readers  
* Chapter Books

Each card should include a one-sentence description.

---

# **Customer Account Updates**

Update child profiles to display:

Age Range

Reading Stage

Interests

Replace all references to "Reading Level" with "Reading Stage".

---

# **Order Data**

Each order should store a snapshot of:

* Age Range  
* Reading Stage  
* Interests

This ensures historical orders remain accurate if profile settings are changed later.

---

# **Operational Workflow**

## **Inventory Organisation**

Inventory should be physically organised by Reading Stage.

Recommended shelf structure:

1. Board Books  
2. Picture Books  
3. Early Readers  
4. Independent Readers  
5. Chapter Books

No requirement exists to organise inventory by interest.

No requirement exists to organise inventory by age range.

---

## **Bundle Packing Workflow**

When fulfilling an order:

Step 1

Select books from the requested Reading Stage.

Step 2

Use Age Range as a validation check to ensure content suitability.

Step 3

Use Interests to personalise the final selection.

Priority order:

1. Reading Stage  
2. Age Range  
3. Interests

---

# **Future Expansion**

Future inventory tooling may optionally support:

* Book cataloguing  
* ISBN scanning  
* Reading Stage tagging  
* Interest tagging  
* Previous-book tracking

However, these features are not required for launch.

The launch version should remain operationally simple and rely on physical inventory organisation by Reading Stage.

