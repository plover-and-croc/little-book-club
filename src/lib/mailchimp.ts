import mailchimp from "@mailchimp/mailchimp_marketing";

function canUseMailchimp() {
  return Boolean(
    process.env.MAILCHIMP_API_KEY &&
      process.env.MAILCHIMP_SERVER_PREFIX &&
      process.env.MAILCHIMP_AUDIENCE_ID,
  );
}

function configureMailchimp() {
  if (!canUseMailchimp()) return false;

  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY!,
    server: process.env.MAILCHIMP_SERVER_PREFIX!,
  });

  return true;
}

export async function syncMailchimpContact(params: {
  email: string;
  subscribed: boolean;
  tags: string[];
  firstName?: string;
  lastName?: string;
}) {
  if (!configureMailchimp()) {
    return { skipped: true as const, reason: "Mailchimp env vars are not configured." };
  }

  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID!;

  await mailchimp.lists.setListMember(audienceId, params.email.toLowerCase(), {
    email_address: params.email,
    status_if_new: params.subscribed ? "subscribed" : "transactional",
    status: params.subscribed ? "subscribed" : "transactional",
    merge_fields: {
      FNAME: params.firstName || "",
      LNAME: params.lastName || "",
    },
  });

  await mailchimp.lists.updateListMemberTags(audienceId, params.email.toLowerCase(), {
    tags: params.tags.map((name) => ({ name, status: "active" })),
  });

  return { skipped: false as const };
}
