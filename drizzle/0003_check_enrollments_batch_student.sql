CREATE OR REPLACE FUNCTION check_enrollment_organization_match()
RETURNS TRIGGER AS $$
DECLARE
    batch_org_id INTEGER;
    student_org_id INTEGER;
BEGIN
    -- Get the organization_id from batches
    SELECT organization_id INTO batch_org_id
    FROM batches
    WHERE id = NEW.batch_id;

    -- Get the organization_id from students
    SELECT organization_id INTO student_org_id
    FROM students
    WHERE id = NEW.student_id;

    -- Check if both exist
    IF batch_org_id IS NULL THEN
        RAISE EXCEPTION 'Invalid batch_id: No matching record in batches';
    ELSIF student_org_id IS NULL THEN
        RAISE EXCEPTION 'Invalid student_id: No matching record in students';
    END IF;

    -- Ensure that both organization_id values match
    IF batch_org_id <> student_org_id THEN
        RAISE EXCEPTION 'Mismatch: batch_id.organization_id must match student_id.organization_id';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the enrollments table
CREATE TRIGGER ensure_enrollment_org_match
BEFORE INSERT OR UPDATE ON p_enrollments
FOR EACH ROW
EXECUTE FUNCTION check_enrollment_organization_match();
