# Voice Command Examples

Test your hotel task management app with these voice command examples.

## Basic Requests

### Example 1: Housekeeping - Extra Items
> "Room 405 needs extra pillows and towels. Please send someone from housekeeping. It's for Alex. We need this by 8:00 PM tonight."

**Expected Output:**
- Room: 405
- Category: Housekeeping
- Title: Extra pillows and towels
- Assignee: Alex
- Due Time: 8:00 PM

---

### Example 2: Engineering - Maintenance
> "The air conditioning in room 211 is broken. Can you send John from engineering? This needs to be fixed as soon as possible."

**Expected Output:**
- Room: 211
- Category: Engineering
- Title: Broken air conditioning
- Assignee: John
- Due Time: ASAP

---

### Example 3: Front Desk - Late Checkout
> "Guest in room 802 is requesting a late checkout. Assign this to Mia at the front desk. They need to check out by 12:00 PM."

**Expected Output:**
- Room: 802
- Category: Front Desk
- Title: Late checkout request
- Assignee: Mia
- Due Time: 12:00 PM

---

## More Complex Requests

### Example 4: Concierge - Reservation
> "Room 103 needs a dinner reservation for tonight at 7 PM. This is for Sarah from concierge to handle."

**Expected Output:**
- Room: 103
- Category: Concierge
- Title: Dinner reservation
- Assignee: Sarah
- Due Time: 7:00 PM

---

### Example 5: Housekeeping - Cleaning
> "Room 567 needs a full cleaning. The guest checked out. Send Maria from housekeeping. This should be done before 3 PM."

**Expected Output:**
- Room: 567
- Category: Housekeeping
- Title: Full cleaning needed
- Assignee: Maria
- Due Time: 3:00 PM

---

### Example 6: Engineering - Electrical
> "The TV remote in room 321 isn't working. Engineering needs to check it. Assign to David. Can this be done by tomorrow morning?"

**Expected Output:**
- Room: 321
- Category: Engineering
- Title: TV remote not working
- Assignee: David
- Due Time: Tomorrow morning

---

## Short & Urgent Requests

### Example 7: Quick Request
> "Room 909, broken shower. Engineering. ASAP."

**Expected Output:**
- Room: 909
- Category: Engineering
- Title: Broken shower
- Assignee: (Generic engineering staff)
- Due Time: ASAP

---

### Example 8: Simple Housekeeping
> "Room 234 wants more coffee. Housekeeping. Send it now."

**Expected Output:**
- Room: 234
- Category: Housekeeping
- Title: More coffee needed
- Assignee: (Generic housekeeping staff)
- Due Time: Now/ASAP

---

## Edge Cases (Testing AI Inference)

### Example 9: Minimal Information
> "Room 456 has a problem with the lights. Someone needs to fix it soon."

**Expected Output:**
- Room: 456
- Category: Engineering (inferred from "lights")
- Title: Problem with lights
- Assignee: (Generic engineering staff)
- Due Time: Soon/ASAP

---

### Example 10: No Specific Time
> "Room 678 requests extra blankets. This is for the housekeeping team."

**Expected Output:**
- Room: 678
- Category: Housekeeping
- Title: Extra blankets requested
- Assignee: (Generic housekeeping staff)
- Due Time: ASAP (inferred)

---

### Example 11: No Room Number
> "The lobby coffee machine is broken. Engineering should fix this today."

**Expected Output:**
- Room: Lobby (or N/A)
- Category: Engineering
- Title: Lobby coffee machine broken
- Assignee: (Generic engineering staff)
- Due Time: Today

---

### Example 12: Multiple Requests in One
> "Room 505 needs towels and the TV fixed. Send housekeeping for towels and engineering for the TV. Both needed by tonight."

**Expected Output:**
- Room: 505
- Category: Housekeeping (or split into two tasks)
- Title: Needs towels and TV fixed
- Assignee: (Multiple departments)
- Due Time: Tonight

---

## Test Scenarios

Use these examples to verify your app:

1. ✅ **All fields provided** - Complete information extraction
2. ✅ **Missing assignee** - AI suggests based on category
3. ✅ **Missing time** - AI suggests "ASAP" or reasonable default
4. ✅ **Missing category** - AI infers from task description
5. ✅ **Informal language** - "AC is dead" vs "Air conditioning malfunction"
6. ✅ **Vague time references** - "tonight", "tomorrow", "soon"
7. ✅ **Multiple requests** - Handling compound requests

---

## Tips for Testing

- Speak naturally, as you would in real situations
- Try different accents and speaking speeds
- Test with background noise
- Vary sentence structure and word choice
- Include partial information to test inference
- Use different time formats (12h, 24h, relative)