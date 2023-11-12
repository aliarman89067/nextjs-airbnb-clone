import React from "react";
import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import PropertyClient from "./PropertyClient";
import getListing from "../actions/getListing";

const PropertyPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getListing({ userId: currentUser?.id });
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized user" subTitle="Please Login" />
      </ClientOnly>
    );
  }
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No property found"
          subTitle="Look like you have no property"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertyClient currentUser={currentUser} listings={listings} />
    </ClientOnly>
  );
};

export default PropertyPage;
