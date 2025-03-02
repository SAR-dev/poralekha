CREATE OR REPLACE FUNCTION prevent_organization_id_update()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.organization_id IS DISTINCT FROM NEW.organization_id THEN
        RAISE EXCEPTION 'organization_id cannot be updated';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_students_organization_id_update_trigger
BEFORE UPDATE ON p_students
FOR EACH ROW
EXECUTE FUNCTION prevent_organization_id_update();

CREATE TRIGGER prevent_teachers_organization_id_update_trigger
BEFORE UPDATE ON p_teachers
FOR EACH ROW
EXECUTE FUNCTION prevent_organization_id_update();

CREATE TRIGGER prevent_class_packages_organization_id_update_trigger
BEFORE UPDATE ON p_class_packages
FOR EACH ROW
EXECUTE FUNCTION prevent_organization_id_update();

CREATE TRIGGER prevent_batches_organization_id_update_trigger
BEFORE UPDATE ON p_batches
FOR EACH ROW
EXECUTE FUNCTION prevent_organization_id_update();
