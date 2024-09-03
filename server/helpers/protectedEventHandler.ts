import { EventHandlerRequest, H3Event } from "h3";
import { getServerSession } from "#auth";

export function protectedEventHandler(
  handler: (event: H3Event<EventHandlerRequest>) => Promise<any>
) {
  return eventHandler(async (event) => {
    const session = await getServerSession(event);
    if (!session) {
      return {
        status: 403,
        error: "Forbidden",
      };
    }

    event.context.user = session.user;

    return await handler(event);
  });
}

export function protectedAdminEventHandler(
  handler: (event: H3Event<EventHandlerRequest>) => Promise<any>
) {
  return protectedEventHandler(async (event) => {
    if (!event.context.user.isAdmin) {
      return {
        status: 403,
        error: "Forbidden",
      };
    }

    return await handler(event);
  });
}
