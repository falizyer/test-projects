import React, { PropsWithChildren, ReactNode } from "react";

export interface ComponentRecordProps<T = any> {
  records?: T[];
  isPending: boolean;
  error?: Error;
}

const DataLoading = <div>Data is loading</div>;
const NoDataLoaded = <div>Data was not loaded</div>;
const NoRecordFound = <div>No records found</div>;

function ErrorComponent(props: PropsWithChildren<{ error: Error }>) {
  return <div>{props.error.message}</div>;
}

export default function(props: PropsWithChildren<ComponentRecordProps>) {
  return <>{getComponentState()}</>;

  function getComponentState() {
    if (props.error) {
      return <ErrorComponent error={props.error} />;
    }
    if (props.isPending) {
      return DataLoading;
    }
    if (!props.records) {
      return NoDataLoaded;
    }
    if (!props.records.length) {
      return NoRecordFound;
    }
    // @ts-ignore
    return props.records.map(record => props.children(record));
  }
}
