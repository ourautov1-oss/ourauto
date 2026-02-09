-- Dealer owns cars policy
CREATE POLICY "dealer owns cars"
ON cars
FOR ALL
USING (auth.uid() = dealer_id);

-- Dealer owns leads policy
CREATE POLICY "dealer owns leads"
ON leads
FOR SELECT
USING (auth.uid() = dealer_id);
