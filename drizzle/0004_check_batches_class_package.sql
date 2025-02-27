CREATE OR REPLACE FUNCTION check_batch_organization_match()
RETURNS TRIGGER AS $$
DECLARE
    class_package_org_id INTEGER;
BEGIN
    -- Get the organization_id of the referenced class package
    SELECT organization_id INTO class_package_org_id
    FROM class_packages
    WHERE id = NEW.class_package_id;

    -- If no matching class package, raise an error
    IF class_package_org_id IS NULL THEN
        RAISE EXCEPTION 'Invalid class_package_id: No matching record in class_packages';
    END IF;

    -- Ensure that the class package's organization_id matches the batch's organization_id
    IF class_package_org_id <> NEW.organization_id THEN
        RAISE EXCEPTION 'Mismatch: classPackageId.organization_id must match batches.organization_id';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the batches table
CREATE TRIGGER ensure_class_package_org_match
BEFORE INSERT OR UPDATE ON batches
FOR EACH ROW
EXECUTE FUNCTION check_batch_organization_match();
