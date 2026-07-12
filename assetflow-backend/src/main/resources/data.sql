-- Insert Departments
INSERT INTO departments (id, name, code, description, status) VALUES
    ('11111111-1111-1111-1111-111111111111', 'Engineering', 'ENG', 'Engineering Department', 'ACTIVE'),
    ('22222222-2222-2222-2222-222222222222', 'Marketing', 'MKT', 'Marketing Department', 'ACTIVE'),
    ('33333333-3333-3333-3333-333333333333', 'Sales', 'SAL', 'Sales Department', 'ACTIVE');

-- Insert Users (password: password123)
-- BCrypt hash for "password123"
INSERT INTO users (id, email, password_hash, first_name, last_name, employee_id, role, department_id, is_active) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin@assetflow.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EHs', 'John', 'Doe', 'EMP-001', 'ADMIN', '11111111-1111-1111-1111-111111111111', true),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'priya@assetflow.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EHs', 'Priya', 'Sharma', 'EMP-002', 'DEPARTMENT_HEAD', '11111111-1111-1111-1111-111111111111', true),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'rahul@assetflow.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EHs', 'Rahul', 'Sharma', 'EMP-003', 'ASSET_MANAGER', '22222222-2222-2222-2222-222222222222', true),
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'sarah@assetflow.com', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iAt6Z5EHs', 'Sarah', 'Johnson', 'EMP-004', 'EMPLOYEE', '33333333-3333-3333-3333-333333333333', true);

-- Insert Sample Assets
INSERT INTO assets (id, asset_tag, name, description, serial_number, acquisition_date, acquisition_cost, condition, location, current_status, is_shared_bookable, created_at, updated_at) VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa01', 'AF-0114', 'Dell XPS 15', 'High performance laptop', 'SN-001', '2024-01-15', 1500.00, 'GOOD', 'Floor 3, Cubicle 12', 'AVAILABLE', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa02', 'AF-0023', 'Epson Projector', 'HD Projector for meetings', 'SN-002', '2024-02-20', 800.00, 'GOOD', 'Storage Room A', 'AVAILABLE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa03', 'AF-0056', 'HP Server Rack', 'Enterprise server rack', 'SN-003', '2024-03-10', 5000.00, 'FAIR', 'Server Room B', 'UNDER_MAINTENANCE', false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaa04', 'AF-0089', 'Toyota Innova', 'Company vehicle', 'SN-004', '2024-04-05', 35000.00, 'GOOD', 'Parking Lot B', 'AVAILABLE', true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);