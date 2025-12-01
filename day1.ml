let dial_mod n = ((n mod 100) + 100) mod 100

let get_direction line = line.[0]

let get_count line = int_of_string (String.sub line 1 (String.length line - 1))

let determine_movement direction count = if direction = 'L' then -count else count

let count_crosses old_setting new_setting movement = 
    if movement > 0 then
        new_setting / 100
    else if new_setting > 0 then
        0
    else if old_setting > 0 then
        1 + (new_setting / -100)
    else
        new_setting / -100

let rec loopP1 ic setting zero_count =
    match input_line ic with
    | line -> 
        let count = get_count line in
        let setting = match get_direction line with
            | 'R' -> dial_mod (setting + count)
            | 'L' -> dial_mod (setting - count)
            | _ -> setting
        in
        loopP1 ic setting (if setting = 0 then zero_count + 1 else zero_count)
    | exception End_of_file -> zero_count

let rec loopP2 ic setting zero_count =
  match input_line ic with
  | line ->
    let direction = get_direction line in
    let movement = determine_movement direction (get_count line) in
    let new_setting = setting + movement in
    loopP2 ic (dial_mod new_setting) (zero_count + count_crosses setting new_setting movement)
  | exception End_of_file ->
      zero_count

let () = 
    let ic = open_in "day1.txt" in
    let result = loopP1 ic 50 0 in
    close_in ic;
    print_endline (string_of_int result)

let () = 
    let ic = open_in "day1.txt" in
    let result = loopP2 ic 50 0 in
    close_in ic;
    print_endline (string_of_int result)
