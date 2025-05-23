import { MAX_LABEL_LENGTH } from "../constants/constantDistance";

export const truncateLabel = (label: string) => {
    return label?.length > MAX_LABEL_LENGTH
      ? label.slice(0, MAX_LABEL_LENGTH) + "..."
      : label;
  };