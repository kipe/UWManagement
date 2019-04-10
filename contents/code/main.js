function get_geometry() {
    var window = workspace.activeClient,
        active_area = workspace.clientArea(KWin.MaximizeArea, window),
        wide_screen = active_area.width > 1920;

    return {
        window: window,
        active_area: active_area,
        x: active_area.x,
        y: active_area.y,
        width: active_area.width,
        height: active_area.height,
        half_width: active_area.width / 2,
        half_height: active_area.height / 2,
        middle: active_area.x + (active_area.width / 2),
        side_column_width: wide_screen ? active_area.width / 4 : active_area.width / 2,
        middle_column_width: wide_screen ? active_area.width / 2 : active_area.width,
        middle_column_offset: active_area.x + (wide_screen ? active_area.width / 4 : 0),
        right_column_offset: active_area.x + (wide_screen ? active_area.width / 4 * 3 : active_area.width / 2),
    }
}

function move(window, x, y, width, height) {
    if (window.moveable) {
        window.geometry = {
            x: x,
            y: y,
            width: width,
            height: height,
        }
    }
}

function move_to_top_left(half) {
    var geometry = get_geometry();
    move(geometry.window,
         geometry.x,
         geometry.y,
         half ? geometry.half_width : geometry.side_column_width,
         geometry.half_height);
}

function move_to_left(half) {
    var geometry = get_geometry(),
        display_changed = false;
    // Move to the display on the left, if already in correct position
    if (geometry.window.x == geometry.x &&
        geometry.window.y == geometry.y &&
        geometry.window.width == geometry.side_column_width &&
        geometry.window.height == geometry.height &&
        geometry.x > 0) {
            geometry.x -= geometry.side_column_width;
            display_changed = true;
    }
    move(geometry.window,
         geometry.x,
         geometry.y,
         half ? geometry.half_width : geometry.side_column_width,
         geometry.height);
    if (display_changed) {
        // Ugly hack just to resize the window correctly...
        move_to_right(half);
    }
}

function move_to_bottom_left(half) {
    var geometry = get_geometry();
    move(geometry.window,
         geometry.x,
         geometry.half_height,
         half ? geometry.half_width : geometry.side_column_width,
         geometry.half_height);
}

function move_to_top_center(full_width) {
    var geometry = get_geometry();
    move(geometry.window,
         full_width ? geometry.x : geometry.middle_column_offset,
         geometry.y,
         full_width ? geometry.width : geometry.middle_column_width,
         geometry.half_height);
}

function move_to_center(full_width) {
    var geometry = get_geometry();
    move(geometry.window,
         full_width ? geometry.x : geometry.middle_column_offset,
         geometry.y,
         full_width ? geometry.width : geometry.middle_column_width,
         geometry.height);
}

function move_to_bottom_center(full_width) {
    var geometry = get_geometry();
    move(geometry.window,
         full_width ? geometry.x : geometry.middle_column_offset,
         geometry.half_height,
         full_width ? geometry.width : geometry.middle_column_width,
         geometry.half_height);
}

function move_to_top_right(half) {
    var geometry = get_geometry();
    move(geometry.window,
         half ? geometry.middle : geometry.right_column_offset,
         geometry.y,
         half ? geometry.half_width : geometry.side_column_width,
         geometry.half_height);
}

function move_to_right(half) {
    var geometry = get_geometry(),
        display_changed = false;
    // Move to the display on the right, if already in correct position
    if (geometry.window.x == geometry.right_column_offset &&
        geometry.window.y == geometry.y &&
        geometry.window.width == geometry.side_column_width &&
        geometry.window.height == geometry.height &&
        geometry.x == 0) {
            geometry.right_column_offset = geometry.width;
            display_changed = true;
    }
    move(geometry.window,
         half ? geometry.middle : geometry.right_column_offset,
         geometry.y,
         half ? geometry.half_width : geometry.side_column_width,
         geometry.height);
    if (display_changed) {
        // Ugly hack just to resize the window correctly...
        move_to_left(half);
    }
}

function move_to_bottom_right(half) {
    var geometry = get_geometry();
    move(geometry.window,
         half ? geometry.middle : geometry.right_column_offset,
         geometry.half_height,
         half ? geometry.half_width : geometry.side_column_width,
         geometry.half_height);
}

registerShortcut("MoveWindowToTopLeft", "UWManagement: Move window to top-left", "Meta+Q", function() { move_to_top_left(false) });
registerShortcut("MoveWindowToLeft", "UWManagement: Move window to left", "Meta+A", function() { move_to_left(false) });
registerShortcut("MoveWindowToBottomLeft", "UWManagement: Move window to bottom-left", "Meta+Z", function() { move_to_bottom_left(false) });
registerShortcut("MoveWindowToTopLeftHalf", "UWManagement: Move window to top-left (half screen)", "Meta+Shift+Q", function() { move_to_top_left(true) });
registerShortcut("MoveWindowToLeftHalf", "UWManagement: Move window to left (half screen)", "Meta+Shift+A", function() { move_to_left(true) });
registerShortcut("MoveWindowToBottomLeftHalf", "UWManagement: Move window to bottom-left (half screen)", "Meta+Shift+Z", function() { move_to_bottom_left(true) });

registerShortcut("MoveWindowToTopCenter", "UWManagement: Move window to top-center", "Meta+W", function() { move_to_top_center(false) });
registerShortcut("MoveWindowToCenter", "UWManagement: Move window to center", "Meta+S", function() { move_to_center(false) });
registerShortcut("MoveWindowToBottomCenter", "UWManagement: Move window to bottom-center", "Meta+X", function() { move_to_bottom_center(false) });
registerShortcut("MoveWindowToTopCenterFullWidth", "UWManagement: Move window to top-center (full width)", "Meta+Shift+W", function() { move_to_top_center(true) });
registerShortcut("MoveWindowToCenterFullWidth", "UWManagement: Move window to center (full width)", "Meta+Shift+S", function() { move_to_center(true) });
registerShortcut("MoveWindowToBottomCenterFullWidth", "UWManagement: Move window to bottom-center (full width)", "Meta+Shift+X", function() { move_to_bottom_center(true) });

registerShortcut("MoveWindowToTopRight", "UWManagement: Move window to top-right", "Meta+E", function() { move_to_top_right(false) });
registerShortcut("MoveWindowToRight", "UWManagement: Move window to right", "Meta+D", function() { move_to_right(false) });
registerShortcut("MoveWindowToBottomRight", "UWManagement: Move window to bottom-right", "Meta+C", function() { move_to_bottom_right(false) });
registerShortcut("MoveWindowToTopRightHalf", "UWManagement: Move window to top-right (half screen)", "Meta+Shift+E", function() { move_to_top_right(true) });
registerShortcut("MoveWindowToRightHalf", "UWManagement: Move window to right (half screen)", "Meta+Shift+D", function() { move_to_right(true) });
registerShortcut("MoveWindowToBottomRightHalf", "UWManagement: Move window to bottom-right (half screen)", "Meta+Shift+C", function() { move_to_bottom_right(true) });
