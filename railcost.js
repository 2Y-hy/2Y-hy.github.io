(() => {
  const links = [...document.querySelectorAll('[data-step]')];
  const steps = [...document.querySelectorAll('.step')];
  function selectStep(choice) {
    const match = /^#step-([1-8])$/.exec(location.hash);
    const selected = typeof choice === 'number' ? choice : match ? Number(match[1]) : Number(document.querySelector('[data-step][aria-current]')?.dataset.step || 1);
    for (const link of links) {
      if (Number(link.dataset.step) === selected) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    }
    steps.forEach((step, index) => { step.hidden = index + 1 !== selected; });
  }
  document.body.classList.add('enhanced');
  selectStep();
  window.addEventListener('hashchange', selectStep);
  window.addEventListener('popstate', selectStep);
  links.forEach(link => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    selectStep(Number(link.dataset.step));
  }));

  const states = [
    {phase:'已确认采购', paid:'¥0', unpaid:'¥1,000', stock:'¥0', cost:'¥0', note:'采购确认应付 1,000 元；尚未付款、入库或耗用，材料成本仍为 0。', equation:'应付 1,000 − 付款 0 = 未付 1,000'},
    {phase:'已部分付款', paid:'¥600', unpaid:'¥400', stock:'¥0', cost:'¥0', note:'支付 600 元减少现金与未付金额。尚未入库或耗用，材料成本仍为 0。', equation:'应付 1,000 − 付款 600 = 未付 400'},
    {phase:'已入库', paid:'¥600', unpaid:'¥400', stock:'¥1,000', cost:'¥0', note:'100 件材料验收入库，价值 1,000 元；还没有实际耗用，材料成本为 0。', equation:'入库 1,000 = 库存 1,000 + 耗用 0'},
    {phase:'已领用', paid:'¥600', unpaid:'¥400', stock:'¥1,000', cost:'¥0', note:'40 件移到现场，仓库还剩 60 件；100 件都尚未耗用，库存仍为 1,000 元。', equation:'仓库 600 + 现场未耗用 400 = 库存 1,000'},
    {phase:'已耗用', paid:'¥600', unpaid:'¥400', stock:'¥700', cost:'¥300', note:'真正耗用 30 件才确认成本 300 元；仓库 60 件、现场 10 件仍为库存，共 700 元。', equation:'入库 1,000 = 库存 700 + 耗用 300'}
  ];
  const fields = {phase:'demo-phase',paid:'paid',unpaid:'unpaid',stock:'stock',cost:'cost',note:'demo-note',equation:'demo-equation'};
  const buttons = [...document.querySelectorAll('[data-demo]')];
  for (const button of buttons) button.addEventListener('click', () => {
    const index = Number(button.dataset.demo);
    for (const [key, id] of Object.entries(fields)) document.getElementById(id).textContent = states[index][key];
    buttons.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  });
})();
