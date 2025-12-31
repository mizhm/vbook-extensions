function extractTokenFromSvg(base64String) {
  let browser = Engine.newBrowser();
  browser.launch("about:blank", 1000);

  let injectionCode = `
        (function() {
            try {
                var img = new Image();
                var src = "${base64String}";
                if (!src.startsWith("data:")) {
                    src = "data:image/svg+xml;base64," + src;
                }
                img.src = src;

                img.onload = function() {
                    var canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);
                    
                    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    var data = imageData.data;
                    var bits = [];

                    // 1. Lấy LSB bits (Logic này đã đúng vì bạn ra được MD5)
                    for (var i = 0; i < data.length; i += 4) {
                        bits.push(data[i] & 1);     // R
                        bits.push(data[i+1] & 1);   // G
                        bits.push(data[i+2] & 1);   // B
                    }

                    // 2. Parse Length (16 bit đầu)
                    var headerBits = bits.slice(0, 16);
                    var tokenLength = parseInt(headerBits.join(''), 2);
                    
                    // Safety check: Token thường là MD5 (32 chars)
                    // Nếu header báo > 32 thì ta ưu tiên giới hạn 32 để cắt bỏ rác
                    var maxLen = 32; 

                    // 3. Giải mã nội dung
                    var contentBits = bits.slice(16);
                    var token = "";
                    
                    for (var i = 0; i < tokenLength; i++) {
                        // FORCE BREAK: Nếu đã đủ 32 ký tự (MD5) thì dừng ngay
                        if (token.length >= maxLen) break;

                        var start = i * 8;
                        // Tránh đọc tràn mảng
                        if (start + 8 > contentBits.length) break;

                        var charBits = contentBits.slice(start, start + 8);
                        var charCode = parseInt(charBits.join(''), 2);

                        if (charCode >= 32 && charCode <= 126) {
                             token += String.fromCharCode(charCode);
                        } else if (charCode === 0) {
                            break;
                        }
                    }
                    
                    // 4. Validate cuối cùng: Kiểm tra đúng format MD5
                    var isMD5 = /^[a-f0-9]{32}$/i.test(token);
                    
                    if (isMD5) {
                         document.body.innerText = JSON.stringify({token: token});
                    } else {
                         // Fallback: Vẫn trả về token đã clean nếu không khớp regex (để debug)
                         // Nhưng ưu tiên cắt đúng 32 chars
                         document.body.innerText = JSON.stringify({token: token.substring(0, 32)});
                    }
                };

                img.onerror = function() {
                    document.body.innerText = JSON.stringify({error: "Image load failed"});
                };

            } catch (e) {
                document.body.innerText = JSON.stringify({error: e.message});
            }
        })();
    `;

  browser.callJs(injectionCode, 1000);

  let resultText = browser.html().text();
  browser.close();

  try {
    let result = JSON.parse(resultText);
    return result.token || null;
  } catch (e) {
    return null;
  }
}
