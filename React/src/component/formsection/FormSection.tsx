import type { FormSectionProps } from "@/types/formgeneral";
import styles from "./FormSection.module.css";

function FormSection({ title, children }: FormSectionProps) {
    return (
        <fieldset className={styles.sectionContainer}>
            <legend className={styles.sectionTitle}>{title}</legend>
            {children}
        </fieldset>
    );
}

export default FormSection;